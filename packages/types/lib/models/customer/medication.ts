import { IBaseModelAttributes } from "../../types";

export interface IMedication extends IBaseModelAttributes {
  name: string;
  instructions?: string;
  system_defined?: boolean;
  medication_category_id?: string;
}
