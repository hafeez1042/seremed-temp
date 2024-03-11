import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ITaskType } from "@seremedi/types/lib/models/customer/taskType"; // Adjust the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface ITaskTypeCreationAttributes extends Optional<ITaskType, modelAttributesOptionalTypes> {}

export function initializeTaskTypeModel(sequelize: Sequelize) {
  class TaskType extends Model<ITaskType, ITaskTypeCreationAttributes> implements ITaskType {
    public id!: string;
    public name!: string;
    public task_category!: string;
    public need_consent?: boolean;
    public allow_refusal?: boolean;
    public schedulable?: boolean;
    public as_needed?: boolean;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  TaskType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    need_consent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    allow_refusal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    schedulable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    as_needed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "task_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return TaskType;
}
