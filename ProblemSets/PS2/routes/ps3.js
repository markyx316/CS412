const express = require('express');
const router = express.Router();

router.get('/fixed-string', (req, res) => {
    res.render('index', { string: 'Hi, how are you?', length: null, paramName: null });
});

router.post('/string-length', (req, res) => {
    const str = req.body.string;
    // console.log(req.body);
    // console.log(str);
    if (!str) {
        return res.status(400).send('Bad request');
    } else {
        res.render('index', { string: str, length: str.length, paramName: null });
    }
});

router.get('/names/:name', (req, res) => {
    const { name } = req.params;
    res.render('index', { string: `Hello, ${name}`, length: null, paramName: name });
});

module.exports = router;
