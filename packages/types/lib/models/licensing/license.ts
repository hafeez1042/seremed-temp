import { IBaseModelAttributes } from "../../types";

export interface ILicense extends IBaseModelAttributes {
  customer_id: string;
  license_count: number;
  start_date: Date;
  end_date: Date;
  licenses_type: string;
}
