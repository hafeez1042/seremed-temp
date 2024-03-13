import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IAccessControl } from "@seremedi/types/lib/models/customer/accessControl";
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IAccessControlCreationAttributes
  extends Optional<IAccessControl, modelAttributesOptionalTypes> {}

export function initializeAccessControlModel(sequelize: Sequelize) {
  class AccessControl
    extends Model<IAccessControl, IAccessControlCreationAttributes>
    implements IAccessControl
  {
    public id!: string;
    public form_name?: string;
    public field_name!: string;
    public list?: boolean;
    public read?: boolean;
    public create?: boolean;
    public edit?: boolean;
    public delete?: boolean;
    public system_defined?: boolean;
    public role_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  AccessControl.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      form_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      field_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      create: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      edit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      delete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      system_defined: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID, // Assuming the ID type of users is UUID
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "access_controls",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return AccessControl as ModelType<IAccessControl, IAccessControlCreationAttributes, AccessControl>;
}

export function initializeAccessControlModelAssociation(
  AccessControlModel: ModelType,
  RoleModel: ModelType,
) {
  AccessControlModel.belongsTo(RoleModel, {
    foreignKey: "role_id",
  });
}