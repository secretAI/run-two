require("dotenv").config({path: "./docker.env"});

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5050,
      host: "localhost"
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  },
  docker: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
      host: "host.docker.internal"
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
