import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientRest } from "@seremedi/types/lib/models/customer/clientRest"; // Adjust the import path as necessary

export function initializeClientRestModel(sequelize: Sequelize) {
  class ClientRest extends Model<IClientRest> implements IClientRest {
    public id!: string;
    public client_task_id!: string;
    public value_mins!: number;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientRest.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'client_tasks', // Ensure this matches your actual client tasks table name
        key: 'id',
      },
    },
    value_mins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_rests",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientRest;
}
