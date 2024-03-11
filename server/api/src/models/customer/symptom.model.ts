import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ISymptom } from "@seremedi/types/lib/models/customer/symptom"; // Correct the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface ISymptomCreationAttributes extends Optional<ISymptom, modelAttributesOptionalTypes> {}

export function initializeSymptomModel(sequelize: Sequelize) {
  class Symptom extends Model<ISymptom, ISymptomCreationAttributes> implements ISymptom {
    public id!: string;
    public symptom_category_id?: string;
    public name!: string;
    public description?: string;
    public color_code?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Symptom.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    symptom_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'symptom_categories', // ensure this matches your actual table name
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    color_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "symptoms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Symptom;
}
