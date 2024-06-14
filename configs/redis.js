const redis = require('ioredis');

const createRedisConnection = () => {
   
    const connection = new redis({
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    host: 'redis',
    port: 6379});
    // Error handling for connection errors
    connection.on('error', (error) => {
        console.error('Redis connection error:', error);
        // You might want to handle this error according to your application's requirements
    });

    return connection;
};

module.exports = createRedisConnection;