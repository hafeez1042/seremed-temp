'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('client_medications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      client_task_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'client_tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      client_consent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'client_consents',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      client_refusal_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'client_refusals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      medication_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'medications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      before_food: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('client_medications');
  },
};