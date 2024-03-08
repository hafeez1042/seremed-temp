import { IBaseModelAttributes } from "../../types";

export interface IPainLevel extends IBaseModelAttributes {
  points?: number;
  client_vital_id?: string;
}
