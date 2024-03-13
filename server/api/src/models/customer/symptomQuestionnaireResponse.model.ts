import { DataTypes, Model, Sequelize } from "sequelize";
import { ISymptomQuestionnaireResponse } from "@seremedi/types/lib/models/customer/symptomQuestionnaireResponse"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeSymptomQuestionnaireResponseModel(
  sequelize: Sequelize
) {
  class SymptomQuestionnaireResponse
    extends Model<ISymptomQuestionnaireResponse>
    implements ISymptomQuestionnaireResponse
  {
    public id!: string;
    public symptom_questionnaire_id?: string;
    public client_symptom_id?: string;
    public response?: boolean;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  SymptomQuestionnaireResponse.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      symptom_questionnaire_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "symptom_questionnaires", // Ensure this matches your actual symptom questionnaire table name
          key: "id",
        },
      },
      client_symptom_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_symptoms", // Ensure this matches your actual client symptom table name
          key: "id",
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
    },
    {
      sequelize,
      tableName: "symptom_questionnaire_responses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return SymptomQuestionnaireResponse as ModelType<
    ISymptomQuestionnaireResponse,
    ISymptomQuestionnaireResponse,
    SymptomQuestionnaireResponse
  >;
}

export function initializeSymptomQuestionnaireResponseModelAssociation(
  SymptomQuestionnaireResponseModel: ModelType,
  ClientSymptomModel: ModelType,
  SymptomQuestionnaireModel: ModelType
) {
  SymptomQuestionnaireResponseModel.belongsTo(ClientSymptomModel, {
    foreignKey: "client_symptom_id",
  });
  SymptomQuestionnaireResponseModel.belongsTo(SymptomQuestionnaireModel, {
    foreignKey: "symptom_questionnaire_id",
  });
}
