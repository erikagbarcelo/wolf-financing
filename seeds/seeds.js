const sequelize = require('../config/connection');
const {Users, VestedStocks, Stocks} = require('../models');

const users = require('./users');
const stocks = require('./stocks')

async function seedData () {
    await sequelize.sync({force: true})
    const userData = await Users.bulkCreate(users, {individualHooks: true});
    await Stocks.bulkCreate(stocks)

    for (let i = 0; i<20; i++) {
        const randomTickerIndx = Math.floor(Math.random() * stocks.length)    //Random number between 0 and 49 to randomly pick a stock
        const randomUserIndx = Math.floor(Math.random() * users.length)   //dido for users
        // console.log(randomTickerIndx)
        await VestedStocks.create({
            stockTicker: stocks[randomTickerIndx]["ticker"],
            userId: userData[randomUserIndx].id
        })
    }
    process.exit(0);
}

seedData();