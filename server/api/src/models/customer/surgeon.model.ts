import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ISurgeon } from "@seremedi/types/lib/models/customer/surgeon"; // Update the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface ISurgeonCreationAttributes extends Optional<ISurgeon, modelAttributesOptionalTypes> {}

export function initializeSurgeonModel(sequelize: Sequelize) {
  class Surgeon extends Model<ISurgeon, ISurgeonCreationAttributes>
    implements ISurgeon {
      public id!: string;
      public provider_id!: string;
      // Base model attributes
      public created_at!: Date;
      public updated_at!: Date;
      public created_by!: string;
      public updated_by!: string;
  }

  Surgeon.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    // Base model timestamps
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "surgeons",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Surgeon as ModelType<ISurgeon, ISurgeonCreationAttributes, Surgeon>;
}


export function initializeSurgeonModelAssociation(
  SurgeonModel: ModelType,
  ProviderModel: ModelType,
) {
  SurgeonModel.belongsTo(ProviderModel, {
    foreignKey: "provider_id",
  });
}
