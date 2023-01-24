const router = require("express").Router();
const { Quote } = require("../../models");

router.get("/", (req, res) => {
  Quote.findAll({
    order: [["created_at", "DESC"]],
  })
    .then((dbQuoteData) => res.json(dbQuoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:quoteId", (req, res) => {
  Quote.findByPk(req.params.quoteId)
    .then((dbQuoteData) => res.json(dbQuoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/create", (req, res) => {
  Quote.create({
    ticker: req.body.ticker,
    last_price: req.body.last_price,
    bid_price: req.body.bid_price,
    bid_size: req.body.bid_size,
    ask_size: req.body.ask_price,
    ask_price: req.body.ask_price,
  })
    .then((dbQuoteData) => res.json(dbQuoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:quoteId", (req, res) => {
  Quote.destroy({ where: { ticker: req.params.quoteId } })
    .then((dbQuoteData) => res.json(dbQuoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
