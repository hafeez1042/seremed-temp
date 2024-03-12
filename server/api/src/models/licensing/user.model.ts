import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IUser } from "@seremedi/types/lib/models/licensing/user";
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

export interface IUserCreationAttributes
  extends Optional<IUser, modelAttributesOptionalTypes> {}

export function initializeUserModel(sequelize: Sequelize) {
  class User extends Model<IUser, IUserCreationAttributes> implements IUser {
    public id!: string;
    public cognito_user_name!: string;
    public email!: string;
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
      cognito_user_name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "users",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User as ModelType<IUser, IUserCreationAttributes, User>;
}

export function initializeUserModelAssociation(
  UserModel: ModelType,
  CustomerUserModel: ModelType,
  UserTOSModel: ModelType,
  SuperAdminModel: ModelType,
  CustomerModel: ModelType
) {
  UserModel.belongsToMany(CustomerModel, {
    through: CustomerUserModel,
    uniqueKey: "user_id",
  });
  UserModel.hasMany(CustomerUserModel, { foreignKey: "user_id" });
  UserModel.hasMany(UserTOSModel, { foreignKey: "user_id" });
  UserModel.hasOne(SuperAdminModel, { foreignKey: "user_id" });
}
