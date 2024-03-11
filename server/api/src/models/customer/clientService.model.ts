import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IClientService } from "@seremedi/types/lib/models/customer/clientService"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IClientServiceCreationAttributes extends Optional<IClientService, modelAttributesOptionalTypes> {}

export function initializeClientServiceModel(sequelize: Sequelize) {
  class ClientService extends Model<IClientService, IClientServiceCreationAttributes> implements IClientService {
    public id!: string;
    public client_id!: string;
    public service_start_date!: Date;
    public service_end_date!: Date;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientService.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    service_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    service_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_services",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientService;
}
