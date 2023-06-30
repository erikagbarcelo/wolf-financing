const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class VestedStocks extends Model {}

VestedStocks.init(
    {
        // List of fields
        vestedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        stockTicker: {
            type: DataTypes.STRING,
            references: {
                model: 'stocks',
                key: 'ticker',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'vestedstocks',
    }
)

module.exports = VestedStocks;