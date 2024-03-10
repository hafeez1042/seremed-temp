'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_tos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      agreement_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'agreements',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      agreement: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      agreement_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true, // Set to true if not all records will have this information
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true, // Similar reasoning as created_by
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
    });
    await queryInterface.addIndex('user_tos', ['agreement_id', 'user_id']);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_tos');
  },
};
