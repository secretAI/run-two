module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "demo",
      user: "postgres",
      password: "postgres",
      port: 5050
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  }
};
