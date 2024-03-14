import { DataTypes, Model, Sequelize } from "sequelize";
import { IHeartRate } from "@seremedi/types/lib/models/customer/heartRate"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeHeartRateModel(sequelize: Sequelize) {
  class HeartRate extends Model<IHeartRate> implements IHeartRate {
    public id!: string;
    public client_vital_id?: string;

    public heart_rate_bpm?: number;

    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  HeartRate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_vital_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_vitals", // Ensure this matches your actual client vitals table name
          key: "id",
        },
      },
      heart_rate_bpm: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "heart_rates",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return HeartRate as ModelType<IHeartRate, IHeartRate, HeartRate>;
}

export function initializeHeartRateModelAssociation(
  HeartRateModel: ModelType,
  ClientVitalModel: ModelType
) {
  HeartRateModel.belongsTo(ClientVitalModel, {
    foreignKey: "client_vital_id",
  });
}