import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IRole } from "@seremedi/types/lib/models/customer/role"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IRoleCreationAttributes
  extends Optional<IRole, modelAttributesOptionalTypes> {}

export function initializeRoleModel(sequelize: Sequelize) {
  class Role
    extends Model<IRole, IRoleCreationAttributes>
    implements IRole
  {
    public id!: string;
    public name!: string;
    public priority?: number;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "roles",
      timestamps: true,
    }
  );

  return Role as ModelType<IRole, IRoleCreationAttributes, Role>;
}


export function initializeRoleModelAssociation(
  RoleModel: ModelType,
  UserRoleModel: ModelType,
  UserModel: ModelType,
  AccessControlModel: ModelType,
) {
  RoleModel.hasMany(UserRoleModel, {
    foreignKey: "role_id",
  });

  RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    uniqueKey: "role_id",
  });

  RoleModel.belongsTo(AccessControlModel, {
    foreignKey: "role_id",
  });
}