import { Sequelize } from "sequelize";

export const createSellerDatabaseTables = async (
  sequelize: Sequelize,
  dbName?: string
) => {
  try {
    await sequelize.sync();
    console.log(`Table created for tenant: ${dbName}`);
  } catch (error) {
    console.error(`Failed to create table for tenant: ${dbName}`, error);
  }
};
