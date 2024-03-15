import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IUser } from "@seremedi/types/lib/models/customer/user"; // Correct the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IUserCreationAttributes
  extends Optional<IUser, modelAttributesOptionalTypes> {}

export function initializeUserModel(sequelize: Sequelize) {
  class User extends Model<IUser, IUserCreationAttributes> implements IUser {
    public id!: string;
    public cognito_user_name!: string;
    public first_name!: string;
    public middle_name!: string;
    public last_name!: string;
    public primary_address_id!: string;
    public email!: string;
    public profile_photo_url!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cognito_user_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      primary_address_id: DataTypes.UUID,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profile_photo_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User as ModelType<IUser, IUserCreationAttributes, User>;
}

export function initializeUserModelAssociation(
  UserModel: ModelType,
  UserAddressModel: ModelType,
  UserRoleModel: ModelType,
  CareTeamReplacementModel: ModelType,
  ClientNurseModel: ModelType,
  ClientCaregiverModel: ModelType,
  ClientModel: ModelType,
  RoleModel: ModelType,
  AddressModel: ModelType
) {
  UserModel.belongsToMany(AddressModel, {
    through: UserAddressModel,
    uniqueKey: "user_id",
  });
  UserModel.belongsTo(AddressModel, {
    foreignKey: "primary_address_id",
  });
  UserModel.hasMany(UserRoleModel, {
    foreignKey: "user_id",
  });
  UserModel.hasMany(CareTeamReplacementModel, {
    foreignKey: "prev_care_team_id",
    as: "prev_care_team",
  });
  UserModel.hasMany(CareTeamReplacementModel, {
    foreignKey: "new_care_team_id",
    as: "new_care_team",
  });

  UserModel.hasMany(ClientNurseModel, {
    foreignKey: "nurse_id",
  });

  UserModel.hasMany(ClientCaregiverModel, {
    foreignKey: "caregiver_id",
  });

  UserModel.belongsToMany(ClientModel, {
    as: "caregiver_clients",
    through: ClientCaregiverModel,
    foreignKey: "caregiver_id",
  });
  UserModel.belongsToMany(ClientModel, {
    as: "nurse_clients",
    through: ClientNurseModel,
    foreignKey: "nurse_id",
  });
  UserModel.belongsToMany(RoleModel, {
    as: "roles",
    through: UserRoleModel,
    foreignKey: "user_id",
  });
}
