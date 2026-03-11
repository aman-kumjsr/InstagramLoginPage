const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../models/User");
require("dotenv").config();

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });

    await user.save();

    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = app;