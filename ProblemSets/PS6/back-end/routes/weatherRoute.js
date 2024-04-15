const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const redisClient = require('../redisClient');

router.post('/weather', async (req, res) => {
    const { cities } = req.body;
    console.log(cities);
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherPromises = cities.map(async (city) => {
        const cacheKey = `weather:${city.trim().toLowerCase()}`;
        console.log(cacheKey);
        try {
            const cachedWeather = await redisClient.get(cacheKey);
            if (cachedWeather) {
                return { data: JSON.parse(cachedWeather), fromCache: true };
            } else {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: {
                        q: city,
                        appid: apiKey,
                        units: 'metric'
                    }
                });
                const weatherData = response.data;
                await redisClient.setEx(cacheKey, 15, JSON.stringify(weatherData)); // Cache for 15 seconds
                return { data: weatherData, fromCache: false };
            }
        } catch (error) {
            console.error(`Failed to retrieve weather for ${city}:`, error.message);
            return { error: error.message, city };
        }
    });

    Promise.all(weatherPromises)
        .then(results => res.json(results))
        .catch(error => {
            console.error('Error processing weather data:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router;
