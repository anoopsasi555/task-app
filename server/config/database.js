const { Sequelize } = require("sequelize");
const config = require("./config.json");

const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect,
    dialectModule: mysql2,
  }
);

module.exports = sequelize;
