import { IBaseModelAttributes } from "../../types";

export interface ITaskType extends IBaseModelAttributes {
  name: string;
  task_category: string;
  need_consent?: boolean;
  allow_refusal?: boolean;
  schedulable?: boolean;
  as_needed?: boolean;
}
