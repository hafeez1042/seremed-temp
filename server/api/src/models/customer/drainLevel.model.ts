import { DataTypes, Model, Sequelize } from "sequelize";
import { IDrainLevel } from "@seremedi/types/lib/models/customer/drainLevel"; // Adjust the import path as necessary

export function initializeDrainLevelModel(sequelize: Sequelize) {
  class DrainLevel extends Model<IDrainLevel> implements IDrainLevel {
    public id!: string;
    public drain_level_percent?: number;
    public client_vital_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  DrainLevel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    drain_level_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    client_vital_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'client_vitals', // Ensure this matches your actual client vitals table name
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "drain_levels",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return DrainLevel;
}
