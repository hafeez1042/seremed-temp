import { DataTypes, Model, Sequelize } from "sequelize";
import { ITaskMedia } from "@seremedi/types/lib/models/customer/taskMedia"; // Adjust the import path as necessary

export function initializeTaskMediaModel(sequelize: Sequelize) {
  class TaskMedia extends Model<ITaskMedia> implements ITaskMedia {
    public id!: string;
    public client_task_id!: string;
    public url!: string;
    public type!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  TaskMedia.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'client_tasks', // Assumes a 'client_tasks' table exists
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "task_media",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return TaskMedia;
}
