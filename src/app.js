const express = require("express");
const app = express();
const port = 3000;

app.get("/hello-world", (req, res) => {
  res.send({ msg: "Hello World!" });
});

module.exports = app;
