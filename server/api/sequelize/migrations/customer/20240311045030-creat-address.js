'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("addresses");
  },
};

