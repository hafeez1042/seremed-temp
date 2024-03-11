import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientConsent } from "@seremedi/types/lib/models/customer/clientConsent"; // Correct the import path as necessary

export function initializeClientConsentModel(sequelize: Sequelize) {
  class ClientConsent extends Model<IClientConsent> implements IClientConsent {
    public id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientConsent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_consents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientConsent;
}
