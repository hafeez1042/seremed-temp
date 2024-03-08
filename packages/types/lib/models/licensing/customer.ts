import { IBaseModelAttributes } from "../../types";

export interface ICustomer extends IBaseModelAttributes {
  company_name: string;
  detailed_logging: string;
  database_name: string;
}
