import { IBaseModelAttributes } from "../../types";

export interface ISymptomQuestionnaire extends IBaseModelAttributes {
  question: string;
  symptom_id: string;
}
