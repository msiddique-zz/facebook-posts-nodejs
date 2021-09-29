//const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize, Sequelize);
db.post = require('../models/post')(sequelize, Sequelize);


module.exports = db;