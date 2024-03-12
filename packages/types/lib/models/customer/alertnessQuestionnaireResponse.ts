import { IBaseModelAttributes } from "../../types";

export interface IAlertnessQuestionnaireResponse extends IBaseModelAttributes {
  alert_level_id?: string;
  alertness_questionnaire_id?: string;
  response?: boolean
}
