'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blood_pressures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      client_vital_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'client_vitals', // Adjust to match the actual table name for client vitals
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      systolic_mmhg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      diastolic_mmhg: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('blood_pressures');
  },
};