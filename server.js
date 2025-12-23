const express = require("express");
const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
require("dotenv").config();

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({
      username,
      password   // plain text (learning only)
    });

    await user.save();

    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

