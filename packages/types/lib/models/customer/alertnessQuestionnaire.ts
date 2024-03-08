import { IBaseModelAttributes } from "../../types";

export interface IAlertnessQuestionnaire extends IBaseModelAttributes {
  question: string;
  weightage?: number;
}
