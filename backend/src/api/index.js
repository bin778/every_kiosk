const express = require("express")
const router = express.Router()
const db = require("./db");

// /api/test GET 데이터 전달
router.get("/test", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const test = await db.TestDB(req.query);
  res.send({ result: test });
});

module.exports = router;
