import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IProviderAddress } from "@seremedi/types/lib/models/customer/providerAddress"; // Correct the import path as needed
import {
  AddressTypeEnum,
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
    // Address fields
    public suit_number?: string;
    public apartment_unit_number?: string;
    public street_line_1!: string;
    public street_line_2?: string;
    public city?: string;
    public county?: string;
    public state?: string;
    public country!: string;
    public zip_code?: string;
    public phone_number?: string;
    public email!: string;
    public address_type!: AddressTypeEnum;
    // Base model attributes
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
      // Initialize other address fields
      suit_number: DataTypes.STRING,
      apartment_unit_number: DataTypes.STRING,
      street_line_1: DataTypes.STRING,
      street_line_2: DataTypes.STRING,
      city: DataTypes.STRING,
      county: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      zip_code: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      address_type: DataTypes.STRING,
      // Base model timestamps and UUIDs for created_by/updated_by
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
) {
  ProviderAddressModel.hasOne(ProviderModel, {
    foreignKey: "primary_address_id",
  });

  ProviderModel.belongsTo(ProviderAddressModel, {
    foreignKey: "provider_id",
  });
}