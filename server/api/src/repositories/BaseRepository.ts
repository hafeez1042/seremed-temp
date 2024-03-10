import { Model, Transaction, Op } from 'sequelize';
import {IQueryStringParams} from  "@seremedi/types/lib/types"
import { getData, getDataArray } from "../utils/sequelize/sequelizeUtils";
import { MakeNullishOptional } from "sequelize/types/utils";
import { generateSequelizeQuery } from "../utils/sequelize/generateSequelizeQuery";

export abstract class BaseRepository<TModelAttributes extends {}, TCreationAttributes extends {}> {
  private model: typeof Model & (new () => Model<TModelAttributes, TCreationAttributes>);

  protected constructor(model: typeof Model & (new () => Model<TModelAttributes, TCreationAttributes>)) {
    this.model = model;
  }

  async create(data: MakeNullishOptional<TCreationAttributes>): Promise<TModelAttributes> {
    if(!data) {
      throw new Error("Invalid data");
    }
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {

      const response: Model<TModelAttributes, TCreationAttributes> = await this.model.create(data, { transaction });
      await transaction.commit();
      return getData(response);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getById(id: number): Promise<TModelAttributes | null> {
    const response = await this.model.findByPk(id);
    return response ? getData(response) : null;
  }

  async update(id: number, data: Partial<TModelAttributes>): Promise<TModelAttributes | null> {
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      let entry = await this.model.findByPk(id, { transaction });
      if (!entry) {
        await transaction.rollback();
        throw new Error('Not Found');
      }

      const updatedEntry = await entry.update(data, { transaction });
      await transaction.commit();
      return getData(updatedEntry);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const entry = await this.model.findByPk(id);
    if (!entry) {
      throw new Error('Not Found');
    }
    await entry.destroy();
  }

  async getAll(query: IQueryStringParams): Promise<TModelAttributes[]> {
    const results = await this.model.findAll({
      limit: 50,
      ...generateSequelizeQuery(query, this.getSearchQuery),
    });
    return getDataArray(results);
  }


  private getSearchQuery = (searchText: string) => {
    return {
      [Op.or]: [
        { name: { [Op.like]: `%${searchText}%` } },
        // { description: { [Op.like]: `%${searchText}%` } },
        // { keywords: { [Op.like]: `%${searchText}%` } },
        // { notes: { [Op.like]: `%${searchText}%` } },
        // { metadata: { [Op.like]: `%${searchText}%` } },
      ],
    };
  };

}
