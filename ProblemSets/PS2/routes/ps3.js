const express = require('express');
const router = express.Router();

// GET route that returns a fixed string
router.get('/fixed-string', (req, res) => {
    res.render('index', { string: 'Hey now', length: null, paramName: null });
});

// POST route that returns a string and its length
router.post('/string-length', (req, res) => {
    const { string } = req.body;
    res.render('index', { string, length: string.length, paramName: null });
});

// GET route that reads a parameter from the URL
router.get('/names/:name', (req, res) => {
    const { name } = req.params;
    res.render('index', { string: `Hello, ${name}`, length: null, paramName: name });
});

module.exports = router;
