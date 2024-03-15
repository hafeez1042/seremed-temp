import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IClientAddress } from "@seremedi/types/lib/models/customer/clientAddress"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IClientAddressCreationAttributes
  extends Optional<IClientAddress, modelAttributesOptionalTypes> {}

export function initializeClientAddressModel(sequelize: Sequelize) {
  class ClientAddress
    extends Model<IClientAddress, IClientAddressCreationAttributes>
    implements IClientAddress
  {
    public id!: string;
    public client_id!: string;
    public address_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientAddress.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_id: {
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
      tableName: "client_addresses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientAddress as ModelType<IClientAddress, IClientAddressCreationAttributes, ClientAddress>;
}

export function initializeClientAddressModelAssociation(
  ClientAddressModel: ModelType,
  ClientModel: ModelType,
  AddressModel: ModelType,
) {
  ClientAddressModel.belongsTo(ClientModel, {
    foreignKey: "client_id",
  });
  ClientAddressModel.belongsTo(AddressModel, {
    foreignKey: "client_id",
  });
}