const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({
  dest: "wall-images",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image")) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

app.get("/hello-world", (req, res) => {
  res.send({ msg: "Hello World!" });
});

app.post(
  "/wall-image",
  upload.single("image"),
  async (req, res) => {
    res.send({ msg: "File uploaded to 'wall-images'" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = app;
