const express = require('express');
const dotenv = require('dotenv');

const appConfig = (app) => {
    // Parse JSON bodies
    app.use(express.json());

    // Parse URL-encoded bodies
    app.use(express.urlencoded({ extended: false }));

    // Load environment variables from .env file
    try {
        dotenv.config();
    } catch (err) {
        console.error('Error loading .env file:', err.message);
        process.exit(1); // Terminate the application if dotenv encounters an error
    }

    // Validate required environment variables
    const requiredEnvVars = ['PORT']; // Add other required variables as needed
    const missingEnvVars = requiredEnvVars.filter((key) => !(key in process.env));
    if (missingEnvVars.length > 0) {
        console.error('Missing required environment variables:', missingEnvVars.join(', '));
        process.exit(1); // Terminate the application if required environment variables are missing
    }
};

module.exports = appConfig ;