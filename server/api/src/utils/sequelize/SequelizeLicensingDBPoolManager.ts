import { Sequelize } from "sequelize";
import { initializeUserModel } from "../../models/licensing/user.model";
import { initializeAgreementModel } from "../../models/licensing/agreement.model";
import { initializeLicenseModel } from "../../models/licensing/license.model";
import { initializeCustomerModel } from "../../models/licensing/customer.model";


export class SequelizeLicensingDBPoolManager {
  private pools: Map<string, Sequelize>;

  constructor() {
    this.pools = new Map();
  }

  async getSequelize(dbName: string): Promise<Sequelize> {
    if (!this.pools.has(dbName)) {
      console.log("Creating new Sequelize connection");
      const tenantConfig = await this.getDatabaseConnectionUrl(dbName);
      const sequelize = new Sequelize(tenantConfig, {
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
      this.initializeModels(sequelize);
      // TODO: Should be removed in production
      // await createSellerDatabaseTables(sequelize);
      // await initializeSeedData()

      this.pools.set(dbName, sequelize);
    } else {
      console.log("Using existing Sequelize connection");
    }

    return this.pools.get(dbName)!;
  }

  private initializeModels(sequelize: Sequelize) {

    // Init models
    initializeUserModel(sequelize);
    initializeAgreementModel(sequelize);
    initializeLicenseModel(sequelize)
    initializeCustomerModel(sequelize)

    // Init associations

  }

  private async getDatabaseConnectionUrl(dbName: string) {
    return `${process.env.SQL_DATABASE_URL}/${dbName}`;
  }
}
