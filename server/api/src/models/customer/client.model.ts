import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IClient } from "@seremedi/types/lib/models/customer/client";
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from '../../types/types';

interface IClientCreationAttributes extends Optional<IClient, modelAttributesOptionalTypes> {}



export function initializeClientModel(sequelize: Sequelize) {
  class Client extends Model<IClient, IClientCreationAttributes> implements IClient {
    public id!: string;
    public first_name!: string;
    public middle_name?: string;
    public last_name?: string;
    public title?: string;
    public phone_number?: string;
    public date_of_birth?: Date;
    public client_identification?: string;
    public sex?: string;
    public emergency_contact_type?: string;
    public emergency_phone_number?: string;
    public primary_address_id?: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Client.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    client_identification: DataTypes.STRING,
    sex: DataTypes.STRING,
    emergency_contact_type: DataTypes.STRING,
    emergency_phone_number: DataTypes.STRING,
    primary_address_id: DataTypes.UUID,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: 'clients',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Client as ModelType<IClient, IClientCreationAttributes, Client>
}

export function initializeClientModelAssociation(
  ClientModel: ModelType,
  ClientAddressModel: ModelType,
  ClientServiceModel: ModelType,
  ClientProcedureModel: ModelType,
  ClientAllergyModel: ModelType,
  ClientEquipmentModel: ModelType,
  CareTeamReplacementRequestModel: ModelType,
  ClientCaregiverModel: ModelType,
  ClientNurseModel: ModelType,
  AllergyModel: ModelType,
  ProviderModel: ModelType,
  ProcedureModel: ModelType,
  EquipmentModel: ModelType,
  UserModel: ModelType
) {
  ClientModel.belongsTo(ClientAddressModel, {
    foreignKey: "primary_address_id",
  });
  ClientModel.hasMany(ClientAddressModel, {
    foreignKey: "client_id",
  });

  ClientModel.hasMany(ClientServiceModel, {
    foreignKey: "client_id",
  });

  ClientModel.hasMany(ClientProcedureModel, {
    foreignKey: "client_id",
  });
  ClientModel.belongsToMany(ProcedureModel, {
    through: ClientProcedureModel,
    uniqueKey: "client_id"
  })
  ClientModel.belongsToMany(ProviderModel, {
    through: ClientProcedureModel,
    uniqueKey: "client_id"
  })

  ClientModel.hasMany(ClientAllergyModel, {
    foreignKey: "client_id",
  });
  ClientModel.belongsToMany(AllergyModel, {
    through: ClientAllergyModel,
    uniqueKey: "client_id"
  })

  ClientModel.hasMany(ClientEquipmentModel, {
    foreignKey: "client_id",
  });
  ClientModel.belongsToMany(EquipmentModel, {
    through: ClientAllergyModel,
    uniqueKey: "client_id"
  })

  ClientModel.hasMany(CareTeamReplacementRequestModel, {
    foreignKey: "client_id",
  });

  ClientModel.hasMany(ClientNurseModel, {
    foreignKey: "client_id",
  });
  ClientModel.belongsToMany(UserModel, {
    through: ClientNurseModel,
    uniqueKey: "client_id"
  })

  ClientModel.hasMany(ClientCaregiverModel, {
    foreignKey: "client_id",
  });
  ClientModel.belongsToMany(UserModel, {
    through: ClientCaregiverModel,
    uniqueKey: "client_id"
  })
}