const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("test");
  res.status(500).json({ message: "not implemented" });
});

module.exports = router;
