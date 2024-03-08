import { IBaseModelAttributes } from "../../types";

export interface ICareTeamReplacementRequest extends IBaseModelAttributes {
  client_id: string;
  notes?: string;
  prev_care_team_id?: string;
  new_care_team_id?: string;
}
