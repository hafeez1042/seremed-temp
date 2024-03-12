import { DataTypes, Model, Sequelize } from "sequelize";
import { IPainLevel } from "@seremedi/types/lib/models/customer/painLevel"; // Adjust the import path as necessary

export function initializePainLevelModel(sequelize: Sequelize) {
  class PainLevel extends Model<IPainLevel> implements IPainLevel {
    public id!: string;
    public points?: number;
    public client_vital_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  PainLevel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    points: {
      type: DataTypes.INTEGER,
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
    tableName: "pain_levels",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return PainLevel;
}
