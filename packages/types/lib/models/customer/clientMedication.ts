import { IBaseModelAttributes } from "../../types";

export interface IClientMedication extends IBaseModelAttributes {
  client_task_id: string;
  client_consent_id?: string;
  client_refusal?: string;
  medication_id: string;
  status?: string;
  before_food?: boolean;
}
