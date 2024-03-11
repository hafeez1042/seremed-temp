import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { INurse } from "@seremedi/types/lib/models/customer/nurse"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface INurseCreationAttributes extends Optional<INurse, modelAttributesOptionalTypes> {}

export function initializeNurseModel(sequelize: Sequelize) {
  class Nurse extends Model<INurse, INurseCreationAttributes> implements INurse {
    public id!: string;
    public provider_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Nurse.init({
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
    tableName: "nurses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Nurse;
}
