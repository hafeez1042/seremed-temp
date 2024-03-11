import { IBaseModelAttributes } from "../../types";

export interface IAccessControl extends IBaseModelAttributes {
  /**
   * form_name can be considered as module name
   */
  form_name?: string;
  /**
   * field_name can be used for action, sub module or a specific field in a form
   */
  field_name: string;
  list?: boolean;
  read?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  system_defined?: boolean;
  role_id: string;
}