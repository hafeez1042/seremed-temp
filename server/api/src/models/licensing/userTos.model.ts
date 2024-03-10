import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IUserTos } from "@seremedi/types/lib/models/licensing/userTos"; // Adjust the import path as necessary

interface IUserTosCreationAttributes extends Optional<IUserTos, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'> {}

export function initializeUserTosModel(sequelize: Sequelize) {
  class UserTos extends Model<IUserTos, IUserTosCreationAttributes> implements IUserTos {
    public id!: string;
    public agreement_id!: string;
    public user_id!: string;
    public agreement!: string;
    public agreement_type!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  UserTos.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      agreement_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      agreement: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      agreement_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: 'user_tos',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return UserTos;
}
