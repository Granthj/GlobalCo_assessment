const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Application = db.define('Applications',{

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicantName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    applicantEmail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    resumeLink:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Application;