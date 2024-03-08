import { IBaseModelAttributes } from "../../types";

export interface IBodyTemperature extends IBaseModelAttributes {
  body_temperature_f?: number;
  client_vital_id?: string;
}
