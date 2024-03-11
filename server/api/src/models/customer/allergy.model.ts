import { DataTypes, Model, Sequelize } from "sequelize";
import { IAllergy } from "@seremedi/types/lib/models/customer/allergy"; // Adjust the import path as necessary

export function initializeAllergyModel(sequelize: Sequelize) {
  class Allergy extends Model<IAllergy> implements IAllergy {
    public id!: string;
    public name!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Allergy.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "allergies",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Allergy;
}
