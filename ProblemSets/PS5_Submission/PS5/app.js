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
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// Import the weather route
const weatherRouter = require('./routes/weatherRouter')(redisClient);
app.use('/ps5', weatherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

