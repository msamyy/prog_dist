import { Sequelize } from "sequelize";
import dbConfig from "../../config/config";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    sync: true
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//To test the database connection 
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

db.admin = require("./admin.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.book = require("./book.model")(sequelize, Sequelize);
db.emprunt = require("./emprunt.model")(sequelize, Sequelize);


module.exports = db;
