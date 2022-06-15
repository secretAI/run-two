/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (col) => {
    col.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    col.string("email", 45).notNullable().unique();
    col.text("password").notNullable();
    col.boolean("activated").defaultTo(false);
    col.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
