import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientMedication } from "@seremedi/types/lib/models/customer/clientMedication"; // Correct the import path as needed
import { ModelType } from "../../types/types";

export function initializeClientMedicationModel(sequelize: Sequelize) {
  class ClientMedication
    extends Model<IClientMedication>
    implements IClientMedication
  {
    public id!: string;
    public client_task_id!: string;
    public client_consent_id?: string;
    public client_refusal_id?: string; // Corrected to client_refusal_id
    public medication_id!: string;
    public status?: string;
    public before_food?: boolean;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientMedication.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "client_tasks",
          key: "id",
        },
      },
      client_consent_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_consents",
          key: "id",
        },
      },
      client_refusal_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_refusals", // Make sure this matches your actual refusal table name
          key: "id",
        },
      },
      medication_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "medications",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      before_food: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "client_medications",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientMedication as ModelType<
    IClientMedication,
    IClientMedication,
    ClientMedication
  >;
}

export function initializeClientMedicationModelAssociation(
  ClientMedicationModel: ModelType,
  ClientTaskModel: ModelType,
  ClientConsentModel: ModelType,
  ClientRefusalModel: ModelType,
  MedicationModel: ModelType
) {
  ClientMedicationModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
  ClientMedicationModel.belongsTo(ClientConsentModel, {
    foreignKey: "client_consent_id",
  });
  ClientMedicationModel.belongsTo(ClientRefusalModel, {
    foreignKey: "client_refusal_id",
  });
  ClientMedicationModel.belongsTo(MedicationModel, {
    foreignKey: "medication_id",
  });
}
