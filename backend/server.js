const express = require("express");
const cors = require("cors");
const DBFunc = require("./database.js");
const app = express();
const port = 3000;

app.use(cors());

app.get("/getAmountOfCards", (req, res) => {
  DBFunc.getAllRowsCount("users").then((r) => {
    res.json(r);
  });
});

// коммент для проверки

app.get("/getCard", (req, res) => {
  const CardID = req.query.CardID;
  DBFunc.getCardDataById(CardID)
    .then.then((r) => {
      console.log(r);
    })
    .then((r) => {
      res.json(r);
    });
});

app.get("/updateLike", (req, res) => {
  const CardID = req.query.CardID;
  DBFunc.addLikeById(CardID)
    .then((r) => {
      res.json(r);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
