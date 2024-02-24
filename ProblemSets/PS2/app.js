const express = require('express');
const bodyParser = require('body-parser');
const ps3Router = require('./routes/ps3');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/ps3', ps3Router);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
