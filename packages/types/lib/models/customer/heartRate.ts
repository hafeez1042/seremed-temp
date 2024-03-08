import { IBaseModelAttributes } from "../../types";

export interface IHeartRate extends IBaseModelAttributes {
  heart_rate_bpm?: number;
  client_vital_id?: string;
}
