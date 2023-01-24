const { Transaction } = require("../models");

const transactionData = [
  {
    trader_id: "1",
    amount: 200,
  },
  {
    trader_id: "2",
    amount: 300,
  },
];

const seedTransactions = () => Transaction.bulkCreate(transactionData);

module.exports = seedTransactions;
