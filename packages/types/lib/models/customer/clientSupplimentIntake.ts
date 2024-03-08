import { IBaseModelAttributes } from "../../types";

export interface IClientSupplementIntake extends IBaseModelAttributes {
  client_task_id: string;
  notes?: string;
}
