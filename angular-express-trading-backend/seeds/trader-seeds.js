const { Trader } = require("../models");

const traderData = [
  {
    first_name: "Jon",
    last_name: "Snow",
    country: "Canada",
    dob: "Mar 28, 2000",
    amount: 200,
  },
  {
    first_name: "Lily",
    last_name: "Baker",
    country: "Canada",
    dob: "Jan 1, 2000",
    amount: 300,
  },
];

const seedTraders = () => Trader.bulkCreate(traderData);

module.exports = seedTraders;
