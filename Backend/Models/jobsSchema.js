const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Job = db.define('Jobs',{

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
        allowNull: false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

});

module.exports = Job;