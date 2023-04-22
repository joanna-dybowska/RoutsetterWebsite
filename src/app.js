const express = require("express");
const app = express();
const port = 3000;

app.get("/hello-world", (req, res) => {
  res.send({ msg: "Hello World!" });
});

app.post("/wall-image", (req, res) => {
  res.status(500).send({ error: "Not implemented" });
});

module.exports = app;
