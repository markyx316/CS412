const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const redisClient = require('../redisClient');

// router.post('/weather', async (req, res) => {
//     const { cities } = req.body;
//     const responses = await Promise.all(cities.map(async (city) => {
//         const cacheKey = `weather:${city}`;
//         const cachedData = await req.redis.get(cacheKey);

//         if (cachedData) {
//             return { data: JSON.parse(cachedData), source: 'cache', city };
//         } else {
//             try {
//                 const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
//                 const weatherData = response.data;
//                 await req.redis.setEx(cacheKey, 15, JSON.stringify(weatherData));
//                 return { data: weatherData, source: 'api', city };
//             } catch (error) {
//                 return { error: error.message, city };
//             }
//         }
//     }));

//     res.json(responses);
// });

router.post('/weather', async (req, res) => {
    const cities = req.body.cities;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherPromises = cities.map(async (city) => {
        const cacheKey = `weather:${city.trim().toLowerCase()}`;
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
                await redisClient.setEx(cacheKey, 600, JSON.stringify(weatherData)); // Cache for 10 minutes
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
