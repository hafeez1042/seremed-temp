import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ICaregiver } from "@seremedi/types/lib/models/customer/caregiver"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface ICaregiverCreationAttributes extends Optional<ICaregiver, modelAttributesOptionalTypes> {}

export function initializeCaregiverModel(sequelize: Sequelize) {
  class Caregiver extends Model<ICaregiver, ICaregiverCreationAttributes> implements ICaregiver {
    public id!: string;
    public provider_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Caregiver.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "caregivers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Caregiver as ModelType<ICaregiver, ICaregiverCreationAttributes, Caregiver>;
}

export function initializeCaregiverModelAssociation(
  CaregiverModel: ModelType,
  ProviderModel: ModelType,
) {
  CaregiverModel.belongsTo(ProviderModel, {
    foreignKey: "provider_id",
  });
}