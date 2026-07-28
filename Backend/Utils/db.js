require('dotenv').config();

const { Sequelize } = require('sequelize');
require('pg');
require('pg-hstore');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;