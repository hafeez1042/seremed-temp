import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientNurse } from "@seremedi/types/lib/models/customer/clientNurse"; // Adjust the import path as necessary

export function initializeClientNurseModel(sequelize: Sequelize) {
  class ClientNurse extends Model<IClientNurse> implements IClientNurse {
    public id!: string;
    public client_service_id!: string;
    public nurse_id!: string;
    public status!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientNurse.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_service_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'client_services', // Ensure this table exists and is correct
        key: 'id',
      },
    },
    nurse_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Assuming the nurses are stored in a 'users' table
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_nurses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientNurse;
}
