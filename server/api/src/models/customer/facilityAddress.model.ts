import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IFacilityAddress } from "@seremedi/types/lib/models/customer/facilityAddress"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IFacilityAddressCreationAttributes extends Optional<IFacilityAddress, modelAttributesOptionalTypes> {}

export function initializeFacilityAddressModel(sequelize: Sequelize) {
  class FacilityAddress extends Model<IFacilityAddress, IFacilityAddressCreationAttributes> implements IFacilityAddress {
    public id!: string;
    public facility_id!: string;
    public address_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  FacilityAddress.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    facility_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
   
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "facility_addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return FacilityAddress as ModelType<IFacilityAddress, IFacilityAddressCreationAttributes, FacilityAddress>;
}

export function initializeFacilityAddressModelAssociation(
  FacilityAddressModel: ModelType,
  FacilityModel: ModelType,
  AddressModel: ModelType
) {
  FacilityAddressModel.belongsTo(FacilityModel, {
    foreignKey: "facility_id",
  });

  FacilityAddressModel.belongsTo(AddressModel, {
    foreignKey: "address_id",
  });


}