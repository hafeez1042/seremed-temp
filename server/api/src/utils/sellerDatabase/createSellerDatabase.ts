import { Sequelize } from "sequelize";

export const createSellerDatabase = async (dbName: string) => {
  try {
    // Connect to a default database, like MySQL's default 'mysql' database
    const sequelize = new Sequelize(process.env.SELLER_SQL_DATABASE_URL!, {
      dialect: "mysql",
    });

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
    console.log(`Database ${dbName} created successfully.`);
    sequelize.close()
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
}
