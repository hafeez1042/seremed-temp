import { IBaseModelAttributes } from "../../types";

export interface IUserTos extends IBaseModelAttributes {
  /**
   * ID of the agreement from agreements table
   */
  agreement_id: string;
  /**
   * the user who agreed with the agreement
   */
  user_id: string;
  /**
   * Signed copy of the agreement (full text)
   */
  agreement: string;
  /**
   * type of agreement, that is same from agreements table
   */
  agreement_type: string;
}
