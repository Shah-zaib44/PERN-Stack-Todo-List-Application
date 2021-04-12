const dbConfig = require("../../config/db");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });"postgres://postgres:postgres@localhost:5432/postgres"
const sequelize = new Sequelize(
  "postgres://owgwskzxzicxhp:e3bbe2bbbe3fcc6295c8834a668a15cf988179fa84fb05a8edd8d4f1a6be9386@ec2-34-230-167-186.compute-1.amazonaws.com:5432/d6ss8sls9bk8to",
  {
    dialect: dbConfig.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
// const sequelize=new Sequelize(
//   {
//     connectionString:''
//   }
// )
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todoLists = require("./todoList.js")(sequelize, Sequelize);

module.exports = db;
