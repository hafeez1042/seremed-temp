import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientHistoryReport } from "@seremedi/types/lib/models/customer/clientHistoryReport"; // Adjust the import path as necessary

export function initializeClientHistoryReportModel(sequelize: Sequelize) {
  class ClientHistoryReport extends Model<IClientHistoryReport> implements IClientHistoryReport {
    public id!: string;
    public client_id?: string;
    public report_data?: string;
    public access_password?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientHistoryReport.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'clients', // Ensure this matches your actual clients table name
        key: 'id',
      },
    },
    report_data: {
      type: DataTypes.TEXT('long'), // Use TEXT or JSON type depending on your DB's support; 'long' for MySQL
      allowNull: true,
    },
    access_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_history_reports",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientHistoryReport;
}
