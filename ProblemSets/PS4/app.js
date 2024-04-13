const express = require('express');
const bodyParser = require('body-parser');
const ps4Router = require('./routes/PS4');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use('/ps4', ps4Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
