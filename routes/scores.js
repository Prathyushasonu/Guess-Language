var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { default: authenticated } = require('../middleware/auth.middleware');

router.use(authenticated);

router.put("/updateScore", async (req, res) => {
    try {
        const { username } = req.session.user;
        const { score } = req.body;

        const result = await User.findOneAndUpdate(
            { username },
            { $set: { maxScore: score } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ username, maxScore: result.maxScore });
    } catch (err) {
        console.error("Error updating score:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const users = await User.find({}, { username: 1, maxScore: 1 }).sort({ maxScore: -1 });
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error at /leaderboard:", err.message);
        res.status(500).json({ message: "Failed to fetch leaderboard. Please try again later." });
    }
});


module.exports = router;
