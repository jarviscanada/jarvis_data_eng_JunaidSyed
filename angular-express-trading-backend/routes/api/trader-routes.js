const router = require("express").Router();
const { Trader } = require("../../models");

router.get("/", (req, res) => {
  Trader.findAll({
    order: [["created_at", "DESC"]],
  })
    .then((dbTraderData) => res.json(dbTraderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:traderId", (req, res) => {
  Trader.findByPk(req.params.traderId)
    .then((dbTraderData) => res.json(dbTraderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/create", (req, res) => {
  Trader.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    country: req.body.country,
    dob: req.body.dob,
    amount: 0,
  })
    .then((dbTraderData) => res.json(dbTraderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:traderId", (req, res) => {
  Trader.destroy({ where: { id: req.params.traderId } })
    .then((dbTraderData) => res.json(dbTraderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
