import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ITask } from "@seremedi/types/lib/models/customer/task"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface ITaskCreationAttributes
  extends Optional<ITask, modelAttributesOptionalTypes> {}

export function initializeTaskModel(sequelize: Sequelize) {
  class Task extends Model<ITask, ITaskCreationAttributes> implements ITask {
    public id!: string;
    public name!: string;
    public instructions?: string;
    public task_type_id?: string;
    public check_list?: string; // JSON data for checklist
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      task_type_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "task_types",
          key: "id",
        },
      },
      check_list: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "tasks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Task as ModelType<ITask, ITaskCreationAttributes, Task>;
}

export function initializeTaskModelAssociation(
  TaskModel: ModelType,
  ClientTaskModel: ModelType,
  TaskTypesModel: ModelType
) {
  TaskModel.belongsTo(TaskTypesModel, {
    foreignKey: "task_type_id",
  });
  TaskModel.hasMany(ClientTaskModel, {
    foreignKey: "task_id",
  });
}
