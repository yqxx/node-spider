var Sequelize = require('sequelize');
var config = require('../config');

var sequelize = new Sequelize(config.dbconfig.database, config.dbconfig.user, config.dbconfig.password, {
  host: config.dbconfig.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.sync({force: false});

var db        = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
