import { BuildOptions, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ILicense } from "@seremedi/types/lib/models/licensing/license"; // Adjust import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface ILicenseCreationAttributes extends Optional<ILicense, modelAttributesOptionalTypes> {}

export function initializeLicenseModel(sequelize: Sequelize) {
  class License extends Model<ILicense, ILicenseCreationAttributes> implements ILicense {
    public id!: string;
    public customer_id!: string;
    public license_count!: number;
    public start_date!: Date;
    public end_date!: Date;
    public licenses_type!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  License.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      license_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      licenses_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: 'licenses',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );


  return License as ModelType<ILicense, ILicenseCreationAttributes, License>;
}


export const initializeLicenseRelations = (LicenseModel: ModelType<ILicense, ILicenseCreationAttributes>, CustomerModel: ModelType) => {
  LicenseModel.belongsTo(CustomerModel, {foreignKey: "customer_id", as: 'customer'})
}
