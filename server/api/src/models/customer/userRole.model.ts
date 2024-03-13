import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IUserRole } from "@seremedi/types/lib/models/customer/userRole";
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IUserRoleCreationAttributes
  extends Optional<IUserRole, modelAttributesOptionalTypes> {}

export function initializeUserRoleModel(sequelize: Sequelize) {
  class UserRole
    extends Model<IUserRole, IUserRoleCreationAttributes>
    implements IUserRole
  {
    public id!: string;
    public user_id!: string;
    public role_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", // Adjust according to your table names
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "roles", // Adjust according to your table names
          key: "id",
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "user_roles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return UserRole as ModelType<
    IUserRole,
    IUserRoleCreationAttributes,
    UserRole
  >;
}

export function initializeUserRoleModelAssociation(
  UserRoleModel: ModelType,
  UserModel: ModelType,
  RoleModel: ModelType
) {
  UserRoleModel.hasMany(UserModel, {
    foreignKey: "user_id",
  });
  UserRoleModel.hasMany(RoleModel, {
    foreignKey: "role_id",
  });
}
