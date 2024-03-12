'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alertness_levels', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      alertness_lvl_percent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      client_vital_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'client_vitals', // Adjust to match the actual name of your client vitals table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('alertness_levels');
  },
};
