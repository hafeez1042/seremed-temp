"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_addresses", {
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
          model: "users", // This should be the table name of the User model
          key: "id", // The column in the User table that this foreign key references
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Adjust depending on desired behavior when a User is deleted
      },
      address_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,
    });
    await queryInterface.addConstraint("users", {
      fields: ["primary_address_id"], // Column name to add the foreign key constraint to
      type: "foreign key",
      name: "fk_users_primary_address_id", // Optional: Specify a custom name for the foreign key constraint
      references: {
        table: "user_addresses", // Name of the table that the foreign key references
        field: "id", // Column name in the referenced table
      },
      onUpdate: "CASCADE", // Action to take on update of referenced column
      onDelete: "SET NULL", // Action to take on delete of referenced row
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_addresses");
    await queryInterface.removeConstraint(
      "users",
      "fk_users_primary_address_id"
    );
  },
};
