const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const weatherRouter = require('./routes/weatherRoute');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use('/ps6', weatherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
