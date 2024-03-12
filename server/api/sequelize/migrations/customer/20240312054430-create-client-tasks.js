'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('client_tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clients',
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
      status: Sequelize.STRING,
      cancellation_reason: Sequelize.STRING,
      comment: Sequelize.TEXT,
      start_at: Sequelize.DATE,
      task_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      check_list: Sequelize.JSON,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('client_tasks');
  },
};