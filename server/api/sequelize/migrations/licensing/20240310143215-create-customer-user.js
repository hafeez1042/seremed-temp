'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // Table name as defined in your database
          key: 'id', // Column name in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // or 'SET NULL' based on your requirements
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers', // Table name as defined in your database
          key: 'id', // Column name in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // or 'SET NULL' based on your requirements
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ACTIVE', 'SUSPENDED'],
        allowNull: false,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: false,
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

    // Create indexes for foreign keys for improved performance
    await queryInterface.addIndex('customer_users', ['user_id', 'customer_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer_users');
  },
};
