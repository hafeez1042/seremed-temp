import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientWalk } from "@seremedi/types/lib/models/customer/clientWalk";
import { ModelType } from "../../types/types";

export function initializeClientWalkModel(sequelize: Sequelize) {
  class ClientWalk extends Model<IClientWalk> implements IClientWalk {
    public id!: string;
    public client_task_id!: string;
    public duration_mins?: number;
    public distance_miles?: number;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientWalk.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'client_tasks',
        key: 'id',
      },
    },
    duration_mins: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    distance_miles: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_walks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientWalk as ModelType<IClientWalk, IClientWalk, ClientWalk>;
}

export function initializeClientWalkModelAssociation(
  ClientWalkModel: ModelType,
  ClientTaskModel: ModelType,
) {
  ClientWalkModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
}
