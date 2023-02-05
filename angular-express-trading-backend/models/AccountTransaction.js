const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Transaction extends Model {}
Transaction.init(
  {
    trader_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "transaction",
  }
);

module.exports = Transaction;
