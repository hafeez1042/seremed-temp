import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ISymptomQuestionnaire } from "@seremedi/types/lib/models/customer/symptomQuestionnaire"; // Correct the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface ISymptomQuestionnaireCreationAttributes extends Optional<ISymptomQuestionnaire, modelAttributesOptionalTypes> {}

export function initializeSymptomQuestionnaireModel(sequelize: Sequelize) {
  class SymptomQuestionnaire extends Model<ISymptomQuestionnaire, ISymptomQuestionnaireCreationAttributes> implements ISymptomQuestionnaire {
    public id!: string;
    public question!: string;
    public symptom_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  SymptomQuestionnaire.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    symptom_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'symptoms', // Ensure this matches your actual symptoms table name
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "symptom_questionnaires",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return SymptomQuestionnaire;
}
