import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientSupplementIntake } from "@seremedi/types/lib/models/customer/clientSupplementIntake";
import { ModelType } from "../../types/types";

export function initializeClientSupplementIntakeModel(sequelize: Sequelize) {
  class ClientSupplementIntake
    extends Model<IClientSupplementIntake>
    implements IClientSupplementIntake
  {
    public id!: string;
    public client_task_id!: string;
    public notes?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientSupplementIntake.init(
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
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "client_supplement_intakes",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientSupplementIntake as ModelType<
    IClientSupplementIntake,
    IClientSupplementIntake,
    ClientSupplementIntake
  >;
}

export function initializeClientSupplementIntakeModelAssociation(
  ClientSupplementIntakeModel: ModelType,
  ClientTaskModel: ModelType
) {
  ClientSupplementIntakeModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
}
