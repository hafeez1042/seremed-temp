import { IBaseModelAttributes } from "../../types";

export interface IDrainLevel extends IBaseModelAttributes {
  drain_level_percent?: number;
  client_vital_id?: string;
}