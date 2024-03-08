import { IBaseModelAttributes } from "../../types";

export interface IClientSymptom extends IBaseModelAttributes {
  client_task_id: string;
  symptom_id: string;
}
