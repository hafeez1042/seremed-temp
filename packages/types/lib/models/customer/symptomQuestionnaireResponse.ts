import { IBaseModelAttributes } from "../../types";

export interface ISymptomQuestionnaireResponse extends IBaseModelAttributes {
  symptom_questionnaire_id?: string;
  client_symptom_id?: string;
  response?: boolean;
}
