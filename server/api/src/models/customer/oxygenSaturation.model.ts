import { DataTypes, Model, Sequelize } from "sequelize";
import { IOxygenSaturation } from "@seremedi/types/lib/models/customer/oxygenSaturation"; // Adjust the import path as necessary

export function initializeOxygenSaturationModel(sequelize: Sequelize) {
  class OxygenSaturation extends Model<IOxygenSaturation> implements IOxygenSaturation {
    public id!: string;
    public spo2_percent?: number;
    public client_vital_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  OxygenSaturation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    spo2_percent: {
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
    tableName: "oxygen_saturations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return OxygenSaturation;
}
