import { IModifier } from "../../types";

export interface IAgreement extends IModifier {
  /**
   * Agreement content
   */
  agreement: string;
  /**
   * agreement type
   */
  agreement_type: string;
  /**
   * Version of the agreement
   */
  version: string;
  /**
   * published date of the agreement
   */
  published_date: Date;
}