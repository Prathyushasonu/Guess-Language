const express = require('express');
const Language = require('../models/Language');
const { default: authenticated } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authenticated, async (req, res) => {
    const languages = await Language.find({});
    res.status(200).json({
        languages 
    })
 })

module.exports = router;

