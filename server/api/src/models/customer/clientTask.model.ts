import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientTask } from "@seremedi/types/lib/models/customer/clientTask"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientTaskModel(sequelize: Sequelize) {
  class ClientTask extends Model<IClientTask> implements IClientTask {
    public id!: string;
    public client_id!: string;
    public client_consent_id?: string;
    public client_refusal_id?: string;
    public status?: string;
    public cancellation_reason?: string;
    public comment?: string;
    public start_at?: Date;
    public task_id?: string;
    public check_list?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientTask.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    client_consent_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    client_refusal_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancellation_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    check_list: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientTask as ModelType<IClientTask, IClientTask, ClientTask>;
}

export function initializeClientTaskModelAssociation(
  ClientTaskModel: ModelType,
  TaskModel: ModelType,
  ClientModel: ModelType,
  TaskHistoryModel: ModelType,
  TaskMediaModel: ModelType,
  ClientVitalModel: ModelType,
  ClientFluidIntakeModel: ModelType,
  ClientSupplementIntakeModel: ModelType,
  ClientMedicationModel: ModelType,
  ClientRestingModel: ModelType,
  ClientWalkingModel: ModelType,
  ClientConsentModel: ModelType,
  ClientRefusalModel: ModelType,
  ClientSymptomModel: ModelType,
) {
  ClientTaskModel.belongsTo(TaskModel, {
    foreignKey: "task_id",
  });
  ClientTaskModel.belongsTo(ClientModel, {
    foreignKey: "client_id",
  });
  ClientTaskModel.belongsTo(ClientConsentModel, {
    foreignKey: "client_consent_id",
  });
  ClientTaskModel.belongsTo(ClientRefusalModel, {
    foreignKey: "client_refusal_id",
  });

  ClientTaskModel.hasMany(TaskHistoryModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(TaskMediaModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientMedicationModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientVitalModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientFluidIntakeModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientSupplementIntakeModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientRestingModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientWalkingModel, {
    foreignKey: "client_task_id"
  })
  ClientTaskModel.hasMany(ClientSymptomModel, {
    foreignKey: "client_task_id"
  })
}
