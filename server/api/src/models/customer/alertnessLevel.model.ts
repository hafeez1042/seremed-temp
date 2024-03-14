import { DataTypes, Model, Sequelize } from "sequelize";
import { IAlertnessLevel } from "@seremedi/types/lib/models/customer/alertnessLevel"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeAlertnessLevelModel(sequelize: Sequelize) {
  class AlertnessLevel extends Model<IAlertnessLevel> implements IAlertnessLevel {
    public id!: string;
    public alertness_lvl_percent?: string;
    public client_vital_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  AlertnessLevel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    alertness_lvl_percent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_vital_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'client_vitals',
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "alertness_levels",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return AlertnessLevel as ModelType<IAlertnessLevel, IAlertnessLevel, AlertnessLevel>;
}

export function initializeAlertnessLevelModelAssociation(
  AlertnessLevelModel: ModelType,
  ClientVitalModel: ModelType,
  AlertnessQuestionnaireResponseModel: ModelType,
) {
  AlertnessLevelModel.belongsTo(ClientVitalModel, {
    foreignKey: "client_vital_id",
  });
  AlertnessLevelModel.hasMany(AlertnessQuestionnaireResponseModel, {
    foreignKey: "alert_level_id",
  });
}
