import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientRefusal } from "@seremedi/types/lib/models/customer/clientRefusal"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientRefusalModel(sequelize: Sequelize) {
  class ClientRefusal extends Model<IClientRefusal> implements IClientRefusal {
    public id!: string;
    public document_url?: string;
    public document_type?: string;
    public client_refusal_type_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientRefusal.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      document_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      client_refusal_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_refusal_types",
          key: "id",
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "client_refusals",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientRefusal as ModelType<
    IClientRefusal,
    IClientRefusal,
    ClientRefusal
  >;
}

export function initializeClientRefusalModelAssociation(
  ClientRefusalModel: ModelType,
  ClientTaskModel: ModelType,
  ClientRefusalTypeModel: ModelType,
  ClientMedicationModel: ModelType
) {
  ClientRefusalModel.hasOne(ClientTaskModel, {
    foreignKey: "client_refusal_id",
  });

  ClientRefusalModel.hasOne(ClientMedicationModel, {
    foreignKey: "client_refusal_id",
  });

  ClientRefusalModel.belongsTo(ClientRefusalTypeModel, {
    foreignKey: "client_refusal_type_id",
  });
}
