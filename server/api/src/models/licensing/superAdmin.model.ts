import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ISuperAdmin } from "@seremedi/types/lib/models/licensing/superAdmin"; // Adjust import path as necessary

interface ISuperAdminCreationAttributes extends Optional<ISuperAdmin, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'> {}

export function initializeSuperAdminModel(sequelize: Sequelize) {
  class SuperAdmin extends Model<ISuperAdmin, ISuperAdminCreationAttributes> implements ISuperAdmin {
    public id!: string;
    public user_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  SuperAdmin.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: 'super_admins',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return SuperAdmin;
}
