import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientTaskHistory } from "@seremedi/types/lib/models/customer/clientTaskHistory"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientTaskHistoryModel(sequelize: Sequelize) {
  class ClientTaskHistory
    extends Model<IClientTaskHistory>
    implements IClientTaskHistory
  {
    public id!: string;
    public action!: string;
    public prv_value!: string;
    public value!: string;
    public client_task_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientTaskHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prv_value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      client_task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "client_tasks", // Ensure this matches your actual client tasks table name
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
      tableName: "client_task_histories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientTaskHistory as ModelType<
    IClientTaskHistory,
    IClientTaskHistory,
    ClientTaskHistory
  >;
}

export function initializeClientTaskHistoryModelAssociation(
  ClientTaskHistoryModel: ModelType,
  ClientTaskModel: ModelType
) {
  ClientTaskHistoryModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
}
