import { IBaseModelAttributes } from "../../types";

export interface IBloodPressure extends IBaseModelAttributes {
  client_vital_id?: string;
  systolic_mmhg?: number;
  diastolic_mmhg?: number;
  position?: string;
}
