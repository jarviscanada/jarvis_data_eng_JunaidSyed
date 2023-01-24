const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Trader extends Model {}
Trader.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    country: {
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
    modelName: "trader",
  }
);

module.exports = Trader;
