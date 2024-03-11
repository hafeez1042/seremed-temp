import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IClientAllergy } from "@seremedi/types/lib/models/customer/clientAllergy"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IClientAllergyCreationAttributes extends Optional<IClientAllergy, modelAttributesOptionalTypes> {}

export function initializeClientAllergyModel(sequelize: Sequelize) {
  class ClientAllergy extends Model<IClientAllergy, IClientAllergyCreationAttributes> implements IClientAllergy {
    public id!: string;
    public allergy_id?: string;
    public client_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientAllergy.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    allergy_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'allergies', // Make sure this matches your allergies table name
        key: 'id',
      },
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'clients', // Make sure this matches your clients table name
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_allergies",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientAllergy;
}
