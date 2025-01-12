var express = require('express');
var router = express.Router();
const Users = require('../models/User');
const { default: authenticated } = require('../middleware/auth.middleware');

router.get("/", async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const users = await Users.find({}, { username: 1, maxScore: 1 }).sort({ maxScore: -1 });
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error at /leaderboard:", err.message);
        res.status(500).json({ message: "Failed to fetch leaderboard. Please try again later." });
    }
});

module.exports = router;

