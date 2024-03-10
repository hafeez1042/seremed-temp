import { BuildOptions, Model } from "sequelize";

export type ModelType<T extends {} = {}, TCreationAttributes extends {} = {}, MT = Model> = typeof Model<T, TCreationAttributes> & {
  new(values?: object, options?: BuildOptions): MT;
}
