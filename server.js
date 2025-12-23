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

/* REGISTER */
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({
            username,
            password: password  // plain - text password
        });
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch {
        res.status(400).json({ error: "User already exists" });
    }
});

/* LOGIN */
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        //   const isMatch = await bcrypt.compare(password, user.password);
        //   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

