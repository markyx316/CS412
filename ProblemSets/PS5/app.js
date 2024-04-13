// const express = require('express');
// const redis = require('redis');
// require('dotenv').config();

// const app = express();
// app.use(express.json());


// // Import the weather route
// const weatherRouter = require('./routes/weatherRouter');
// app.use('/ps5', weatherRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// index.js
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});
redisClient.connect();

// Import the weather route
const weatherRouter = require('./routes/weatherRouter')(redisClient);
app.use('/ps5', weatherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

