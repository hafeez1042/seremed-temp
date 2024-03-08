import { Sequelize } from "sequelize";
import PartModel from "../../models/sellerModels/PartModel";
import PartRelated from "../../models/sellerModels/PartRelatedModel";
import PartInternalPriceBreakModel from "../../models/sellerModels/PartInternalPriceBreakModel";
import PartImageModel from "../../models/sellerModels/PartImageModel";
import PartSpecModel from "../../models/sellerModels/PartSpecModel";
import PartClassModel from "../../models/sellerModels/PartClassModel";
import PartClassSpecOptionModel from "../../models/sellerModels/PartClassSpecOptionsModel";
import PartClassSpecTemplateAttributeGroupModel from "../../models/sellerModels/PartClassSpecTemplateAttributeGroupModel";
import PartClassSpecTemplateAttributeModel from "../../models/sellerModels/PartClassSpecTemplateAttributeModel";
import PartSpecAttributeModel from "../../models/sellerModels/PartSpecAttributeModel";
import PartSpecAttributeGroupModel from "../../models/sellerModels/PartSpecAttributeGroupModel";
import PartIdentifierModel from "../../models/sellerModels/PartIdentifierModel";
import { createSellerDatabaseTables } from "./createSellerDatabaseTables";
import InventoryLocationModel from "../../models/sellerModels/InventoryLocationModel";
import InventorySiteModel from "../../models/sellerModels/InventorySiteModel";
import InventoryModel from "../../models/sellerModels/InventoryModel";
import SystemOptionModel from "../../models/sellerModels/SystemOptionModel";
import { initializeSeedData } from "./initializeSeedData";

export class SequelizeDBPoolManager {
  private pools: Map<string, Sequelize>;

  constructor() {
    this.pools = new Map();
  }

  async getSellerSequelize(dbName: string): Promise<Sequelize> {
    if (!this.pools.has(dbName)) {
      console.log("Creating new Sequelize connection");
      const tenantConfig = await this.getSellerDatabaseConnectionUrl(dbName);
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
    PartInternalPriceBreakModel.initialize(sequelize);
    PartModel.initialize(sequelize);
    PartRelated.initialize(sequelize);
    PartImageModel.initialize(sequelize);
    PartSpecModel.initialize(sequelize);
    PartClassModel.initialize(sequelize);
    PartClassSpecOptionModel.initialize(sequelize);
    PartClassSpecTemplateAttributeGroupModel.initialize(sequelize);
    PartClassSpecTemplateAttributeModel.initialize(sequelize);
    PartSpecAttributeModel.initialize(sequelize);
    PartSpecAttributeGroupModel.initialize(sequelize);
    PartIdentifierModel.initialize(sequelize);
    InventoryLocationModel.initialize(sequelize);
    InventorySiteModel.initialize(sequelize);
    InventoryModel.initialize(sequelize);
    SystemOptionModel.initialize(sequelize);

    PartInternalPriceBreakModel.associate();
    PartModel.associate();
    PartRelated.associate();
    PartImageModel.associate();
    PartSpecModel.associate();
    PartClassSpecTemplateAttributeGroupModel.associate();
    PartClassSpecTemplateAttributeModel.associate();
    PartSpecAttributeModel.associate();
    PartSpecAttributeGroupModel.associate();
    PartClassModel.associate();
    PartIdentifierModel.associate();
    InventoryLocationModel.associate();
    InventorySiteModel.associate();
    InventoryModel.associate();
  }

  private async getSellerDatabaseConnectionUrl(dbName: string) {
    return `${process.env.SELLER_SQL_DATABASE_URL}/${dbName}`;
  }
}
