import { IBaseModelAttributes } from "../../types";

export interface IAlertnessLevel extends IBaseModelAttributes {
  alertness_lvl_percent?: string;
  client_vital_id?: string;
}
