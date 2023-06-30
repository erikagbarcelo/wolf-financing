const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Stocks extends Model {}

Stocks.init(
    {
        // List of fields
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true             
        },
        median: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        todayHigh: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        todayLow: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        midYearHigh: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        midYearLow: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        }
    },
    {
        sequelize: sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'stocks',
    }    
)

module.exports = Stocks;