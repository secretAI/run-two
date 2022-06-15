/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("tokens", (col) => {
    col.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    col.string("user_email")
      .inTable("users")
      .references("email")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .unique();
    col.text("token", 30).notNullable();
    col.timestamp("expires_at").notNullable();
    col.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("tokens");
};
