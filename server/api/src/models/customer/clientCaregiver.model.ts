import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientCaregiver } from "@seremedi/types/lib/models/customer/clientCaregiver"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientCaregiverModel(sequelize: Sequelize) {
  class ClientCaregiver extends Model<IClientCaregiver> implements IClientCaregiver {
    public id!: string;
    public client_service_id!: string;
    public caregiver_id!: string;
    public status!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientCaregiver.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_service_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    caregiver_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_caregivers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientCaregiver as ModelType<IClientCaregiver, IClientCaregiver, ClientCaregiver>;
}

export function initializeClientCaregiverModelAssociation(
  ClientCaregiverModel: ModelType,
  ClientServiceModel: ModelType,
  UserModel: ModelType,
) {
  ClientCaregiverModel.belongsTo(ClientServiceModel, {
    foreignKey: "client_service_id",
  });

  ClientCaregiverModel.belongsTo(UserModel, {
    foreignKey: "caregiver_id",
  });
}