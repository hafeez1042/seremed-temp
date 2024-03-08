import { IBaseModelAttributes } from "../../types";

export interface IClientTask extends IBaseModelAttributes {
  client_id: string;
  client_consent_id?: string;
  client_refusal_id?: string;
  status?: string;
  cancellation_reason?: string;
  comment?: string;
  start_at?: Date;
  task_id?: string;
  check_list?: string;
}
