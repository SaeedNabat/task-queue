// * node modules
const process = require('node:process');


// * external modules
const express = require('express');
const appConfig = require('./configs/appConfig');


// * internal modules
const router = require('./routes/routes');
const worker = require('./queue/worker');

// * app configs
 const app = express();
appConfig(app);


// * app routes
app.use('/', router)


// * runing server
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000; // Default port if not provided in environment
    const server = app.listen(PORT, (error) => {
        if (error) {
            console.error('Failed to start server:', error);
            return;
        }
        console.log(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
        console.log('Closing application...');
        worker.close();
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Error:', err.stack);
        res.status(500).send('Something went wrong!');
    });
}

module.exports = app;