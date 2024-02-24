const express = require('express');
const bodyParser = require('body-parser');
const ps3Router = require('./routes/ps3');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Pug setup
app.set('view engine', 'pug');

// Mount the ps3 router
app.use('/ps3', ps3Router);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
