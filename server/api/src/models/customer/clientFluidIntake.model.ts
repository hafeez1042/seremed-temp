import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientFluidIntake } from "@seremedi/types/lib/models/customer/clientFluidIntake"; // Correct the import path as needed
import { ModelType } from "../../types/types";

export function initializeClientFluidIntakeModel(sequelize: Sequelize) {
  class ClientFluidIntake extends Model<IClientFluidIntake> implements IClientFluidIntake {
    public id!: string;
    public client_task_id?: string;
    public value_oz?: number;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientFluidIntake.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_task_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'client_tasks', // Ensure this matches your client tasks table name
        key: 'id',
      },
    },
    value_oz: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_fluid_intakes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientFluidIntake as ModelType<IClientFluidIntake, IClientFluidIntake, ClientFluidIntake>;
}

export function initializeClientFluidIntakeModelAssociation(
  ClientFluidIntakeModel: ModelType,
  ClientTaskModel: ModelType,
) {
  ClientFluidIntakeModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
}