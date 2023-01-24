const router = require("express").Router();
const { Transaction, Trader } = require("../../models");

router.get("/:traderId", (req, res) => {
  Transaction.findAll({
    order: [["created_at", "DESC"]],
    where: { trader_id: req.params.traderId },
  })
    .then((dbTransactionData) => res.json(dbTransactionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/transaction/:transactionId", (req, res) => {
  Transaction.findByPk(req.params.transactionId)
    .then((dbTransactionData) => res.json(dbTransactionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/deposit/:traderId", (req, res) => {
  Trader.findByPk(req.params.traderId)
    .then((dbTraderData) => {
      Trader.update(
        { amount: dbTraderData.amount + req.body.amount },
        { where: { id: req.params.traderId } }
      );
      Transaction.create({
        trader_id: req.params.traderId,
        amount: req.body.amount,
      }).then((dbTransactionData) => {
        res.json(dbTransactionData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/withdraw/:traderId", (req, res) => {
  Trader.findByPk(req.params.traderId)
    .then((dbTraderData) => {
      Trader.update(
        { amount: dbTraderData.amount - req.body.amount },
        { where: { id: req.params.traderId } }
      );
      Transaction.create({
        trader_id: req.params.traderId,
        amount: -req.body.amount,
      }).then((dbTransactionData) => {
        res.json(dbTransactionData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
