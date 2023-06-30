const Users = require('./Users');
const VestedStocks = require('./VestedStocks');
const Stocks = require('./Stocks');

Users.hasMany(VestedStocks, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

VestedStocks.belongsTo(Users, {
    foreignKey: 'userId'
})

Stocks.hasMany(VestedStocks, {
    foreignKey: 'stockTicker',
    onDelete: 'CASCADE'
})

VestedStocks.belongsTo(Stocks, {
    foreignKey: 'stockTicker'
})

module.exports = {Users, VestedStocks, Stocks}