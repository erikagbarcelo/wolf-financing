const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class VestedStocks extends Model {}

VestedStocks.init(
    {
        // List of fields
        
    },
    {
        sequelize: sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'vestedstocks',
    }
)

module.exports = VestedStocks;