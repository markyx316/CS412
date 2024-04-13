// const redis = require('redis');
// const { promisify } = require('util');

// const client = redis.createClient({
//   host: 'localhost',
//   port: 6379
// });

// client.on('error', (err) => console.log('Redis Client Error', err));

// // Promisify the get and set methods for easier use with async/await
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

// module.exports = { getAsync, setAsync };
const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client;

