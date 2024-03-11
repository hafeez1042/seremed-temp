import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IFacility } from "@seremedi/types/lib/models/customer/facility"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IFacilityCreationAttributes extends Optional<IFacility, modelAttributesOptionalTypes> {}

export function initializeFacilityModel(sequelize: Sequelize) {
  class Facility extends Model<IFacility, IFacilityCreationAttributes> implements IFacility {
    public id!: string;
    public name!: string;
    public primary_address_id?: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Facility.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_address_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "facilities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Facility;
}