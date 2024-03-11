'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('access_controls', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      form_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      field_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      list: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      create: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      update: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      delete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      system_defined: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      role_id: {
        type: Sequelize.UUID,
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
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    });

    // Create indexes for fields that are likely to be used in queries or as foreign keys
    await queryInterface.addIndex('access_controls', ['role_id'], {
      name: 'access_controls_role_id_idx',
    });
    await queryInterface.addIndex('access_controls', ['form_name'], {
      name: 'access_controls_form_name_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('access_controls');
  },
};

