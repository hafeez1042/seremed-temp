import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IProviderAddress } from "@seremedi/types/lib/models/customer/providerAddress"; // Correct the import path as needed
import {
  modelAttributesOptionalTypes,
} from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IProviderAddressCreationAttributes
  extends Optional<IProviderAddress, modelAttributesOptionalTypes> {}

export function initializeProviderAddressModel(sequelize: Sequelize) {
  class ProviderAddress
    extends Model<IProviderAddress, IProviderAddressCreationAttributes>
    implements IProviderAddress
  {
    public id!: string;
    public provider_id!: string;
    public address_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ProviderAddress.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      provider_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
     
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "provider_addresses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ProviderAddress as ModelType<IProviderAddress, IProviderAddressCreationAttributes, ProviderAddress>;
}


export function initializeProviderAddressModelAssociation(
  ProviderAddressModel: ModelType,
  ProviderModel: ModelType,
  AddressModel: ModelType
) {

  ProviderModel.belongsTo(ProviderAddressModel, {
    foreignKey: "provider_id",
  });
  
  ProviderModel.belongsTo(AddressModel, {
    foreignKey: "address_id",
  });
}