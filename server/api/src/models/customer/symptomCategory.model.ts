import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ISymptomCategory } from "@seremedi/types/lib/models/customer/symptomCategory"; // Correct the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface ISymptomCategoryCreationAttributes
  extends Optional<ISymptomCategory, modelAttributesOptionalTypes> {}

export function initializeSymptomCategoryModel(sequelize: Sequelize) {
  class SymptomCategory
    extends Model<ISymptomCategory, ISymptomCategoryCreationAttributes>
    implements ISymptomCategory
  {
    public id!: string;
    public name!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  SymptomCategory.init(
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
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "symptom_categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return SymptomCategory as ModelType<
    ISymptomCategory,
    ISymptomCategoryCreationAttributes,
    SymptomCategory
  >;
}

export function initializeSymptomCategoryModelAssociation(
  SymptomCategoryModel: ModelType,
  SymptomModel: ModelType
) {
  SymptomCategoryModel.hasMany(SymptomModel, {
    foreignKey: "symptom_category_id",
  });
}
