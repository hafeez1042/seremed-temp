import { DataTypes, Model, Sequelize } from "sequelize";
import { IAlertnessQuestionnaireResponse } from "@seremedi/types/lib/models/customer/alertnessQuestionnaireResponse"; // Adjust the import path as necessary

export function initializeAlertnessQuestionnaireResponseModel(sequelize: Sequelize) {
  class AlertnessQuestionnaireResponse extends Model<IAlertnessQuestionnaireResponse> implements IAlertnessQuestionnaireResponse {
    public id!: string;
    public alert_level_id?: string;
    public alertness_questionnaire_id?: string;
    public response?: boolean;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  AlertnessQuestionnaireResponse.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    alert_level_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'alertness_levels', // Ensure this matches your actual alertness levels table name
        key: 'id',
      },
    },
    alertness_questionnaire_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'alertness_questionnaires', // Ensure this matches your actual alertness questionnaires table name
        key: 'id',
      },
    },
    response: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "alertness_questionnaire_responses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return AlertnessQuestionnaireResponse;
}
