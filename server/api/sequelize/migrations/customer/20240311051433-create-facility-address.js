"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("facility_addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      facility_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "facilities", // Assumes you have a 'facilities' table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      suit_number: Sequelize.STRING,
      apartment_unit_number: Sequelize.STRING,
      street_line_1: Sequelize.STRING,
      street_line_2: Sequelize.STRING,
      city: Sequelize.STRING,
      county: Sequelize.STRING,
      state: Sequelize.STRING,
      country: Sequelize.STRING,
      zip_code: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      email: Sequelize.STRING,
      address_type: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });

    await queryInterface.addConstraint("facilities", {
      fields: ["primary_address_id"], // Column name to add the foreign key constraint to
      type: "foreign key",
      name: "fk_facilities_primary_address_id", // Optional: Specify a custom name for the foreign key constraint
      references: {
        table: "facility_addresses", // Name of the table that the foreign key references
        field: "id", // Column name in the referenced table
      },
      onUpdate: "CASCADE", // Action to take on update of referenced column
      onDelete: "SET NULL", // Action to take on delete of referenced row
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("facility_addresses");
    await queryInterface.removeConstraint(
      "facilities",
      "fk_facilities_primary_address_id"
    );
  },
};
