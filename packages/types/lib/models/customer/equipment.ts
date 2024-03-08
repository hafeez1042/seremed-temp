import { IBaseModelAttributes } from "../../types";

export interface IEquipment extends IBaseModelAttributes {
  equipment_category_id?: string;
  name: string;
  description?: string;
}
