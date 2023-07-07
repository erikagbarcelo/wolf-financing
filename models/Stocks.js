const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Stocks extends Model {}

// ICEBOX Ticker Search by company.
Stocks.init(
    {
        // List of fields
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false
        },
        open: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        close: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        lowestPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false 
        },
        highestPrice: {
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