const { Queue } = require('bullmq');
const connection = require('../configs/redis')();

const createTaskQueue = () => {
    try {
        const taskQueue = new Queue('task-queue', {
            connection 
        });
        return taskQueue;
    } catch (error) {
        console.error('Error creating task queue:', error);
        process.exit(1); // Terminate the application if queue creation fails
    }
};

module.exports = createTaskQueue();