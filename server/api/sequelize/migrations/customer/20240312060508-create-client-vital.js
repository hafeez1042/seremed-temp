'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('client_vitals', {
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
      vital_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'vitals', // Adjust if your table name for vitals is different
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('client_vitals');
  },
};
