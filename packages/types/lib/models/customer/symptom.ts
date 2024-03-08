import { IBaseModelAttributes } from "../../types";

export interface ISymptom extends IBaseModelAttributes {
  symptom_category_id?: string;
  name: string;
  description?: string;
  color_code?: string;
}
