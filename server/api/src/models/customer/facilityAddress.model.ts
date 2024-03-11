import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IFacilityAddress } from "@seremedi/types/lib/models/customer/facilityAddress"; // Adjust the import path as necessary
import { AddressTypeEnum, modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IFacilityAddressCreationAttributes extends Optional<IFacilityAddress, modelAttributesOptionalTypes> {}

export function initializeFacilityAddressModel(sequelize: Sequelize) {
  class FacilityAddress extends Model<IFacilityAddress, IFacilityAddressCreationAttributes> implements IFacilityAddress {
    public id!: string;
    public facility_id!: string;
    public suit_number?: string;
    public apartment_unit_number?: string;
    public street_line_1!: string;
    public street_line_2?: string;
    public city?: string;
    public county?: string;
    public state?: string;
    public country!: string;
    public zip_code?: string;
    public phone_number?: string;
    public email!: string;
    public address_type!: AddressTypeEnum;
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
    suit_number: DataTypes.STRING,
    apartment_unit_number: DataTypes.STRING,
    street_line_1: DataTypes.STRING,
    street_line_2: DataTypes.STRING,
    city: DataTypes.STRING,
    county: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    address_type: DataTypes.STRING,
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

  return FacilityAddress;
}
