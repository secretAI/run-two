/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("posts", (col) => {
    col.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    col.string("user_email")
      .inTable("users")
      .references("email")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    col.string("title", 30).notNullable();
    col.string("body", 100).notNullable();
    col.text("media").nullable();
    col.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("posts");
};
