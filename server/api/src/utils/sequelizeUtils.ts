import { Model } from "sequelize";

export const getData = <T extends Model, R>(instance: T): R =>
  instance.get({ plain: true });

export const getDataArray = <T extends Model, R>(array: T[]): R[] =>
  array.map((instance) => getData(instance));
