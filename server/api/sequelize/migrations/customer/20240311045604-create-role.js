"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("roles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
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
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
    });
    await queryInterface.addConstraint("access_controls", {
      fields: ["role_id"], // Column name to add the foreign key constraint to
      type: "foreign key",
      name: "fk_access_control_role_id", // Optional: Specify a custom name for the foreign key constraint
      references: {
        table: "roles", // Name of the table that the foreign key references
        field: "id", // Column name in the referenced table
      },
      onUpdate: "CASCADE", // Action to take on update of referenced column
      onDelete: "CASCADE", // Action to take on delete of referenced row
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("roles");

    await queryInterface.removeConstraint(
      "access_controls",
      "fk_access_control_role_id"
    );
  },
};
