const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../Models/User"); 
const jwt = require("jsonwebtoken");

const router = express.Router();

// auth midle
const authenticateToken = (req, res, next) => {
    const tokens = req.header('Authorization')?.replace('Bearer ', '');
    if (!tokens) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(tokens, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User created successfully", token });
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err)
    }
});

// Signin
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password is not correct" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, todos: user.todos } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get
router.get("/todos", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ todos: user.todos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update
router.put("/todos", authenticateToken, async (req, res) => {
    try {
        const { todos } = req.body;
        await User.findByIdAndUpdate(req.user.id, { todos });
        res.json({ message: "Todos updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
