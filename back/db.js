const { Sequelize } = require('sequelize');
var { config } = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config();
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
})

module.exports = sequelize