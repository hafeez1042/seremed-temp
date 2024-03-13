import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IAlertnessQuestionnaire } from "@seremedi/types/lib/models/customer/alertnessQuestionnaire"; // Adjust the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IAlertnessQuestionnaireCreationAttributes
  extends Optional<IAlertnessQuestionnaire, modelAttributesOptionalTypes> {}

export function initializeAlertnessQuestionnaireModel(sequelize: Sequelize) {
  class AlertnessQuestionnaire
    extends Model<
      IAlertnessQuestionnaire,
      IAlertnessQuestionnaireCreationAttributes
    >
    implements IAlertnessQuestionnaire
  {
    public id!: string;
    public question!: string;
    public weightage?: number;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  AlertnessQuestionnaire.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightage: {
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
      tableName: "alertness_questionnaires",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return AlertnessQuestionnaire as ModelType<
    IAlertnessQuestionnaire,
    IAlertnessQuestionnaireCreationAttributes,
    AlertnessQuestionnaire
  >;
}

export function initializeAlertnessQuestionnaireModelAssociation(
  AlertnessQuestionnaireModel: ModelType,
  AlertnessQuestionnaireResponseModel: ModelType
) {
  AlertnessQuestionnaireModel.hasMany(AlertnessQuestionnaireResponseModel, {
    foreignKey: "alertness_questionnaire_id",
  });
}
