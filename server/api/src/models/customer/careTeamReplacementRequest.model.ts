import { DataTypes, Model, Sequelize } from "sequelize";
import { ICareTeamReplacementRequest } from "@seremedi/types/lib/models/customer/careTeamReplacementRequest"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeCareTeamReplacementRequestModel(sequelize: Sequelize) {
  class CareTeamReplacementRequest extends Model<ICareTeamReplacementRequest> implements ICareTeamReplacementRequest {
    public id!: string;
    public client_id!: string;
    public notes?: string;
    public prev_care_team_id?: string;
    public new_care_team_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  CareTeamReplacementRequest.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prev_care_team_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    new_care_team_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "care_team_replacement_requests",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return CareTeamReplacementRequest as ModelType<ICareTeamReplacementRequest, ICareTeamReplacementRequest, CareTeamReplacementRequest>;
}


export function initializeCareTeamReplacementRequestModelAssociation(
  CareTeamReplacementRequestModel: ModelType,
  ClientModel: ModelType,
  UserModel: ModelType
) {
  CareTeamReplacementRequestModel.belongsTo(ClientModel, {
    foreignKey: "client_id"
  })
  CareTeamReplacementRequestModel.belongsTo(UserModel, {
    foreignKey: "prev_care_team_id"
  })
  CareTeamReplacementRequestModel.belongsTo(UserModel, {
    foreignKey: "new_care_team_id"
  })

}