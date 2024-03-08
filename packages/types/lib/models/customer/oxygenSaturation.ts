import { IBaseModelAttributes } from "../../types";

export interface IOxygenSaturation extends IBaseModelAttributes {
  spo2_percent?: number;
  client_vital_id?: string;
}
