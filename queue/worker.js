const { Worker } = require('bullmq');
const connection = require('../configs/redis')();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

const worker = new Worker('task-queue', async (job) => {
    try {
        const response = await fetch(`http://${host}:${port}/outcoming/${job.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            console.log(`✔️ Job ${job.id} sent to outcoming`);
        } else {
            console.log(`❌ Error sending job ${job.id} to outcoming. Status: ${response.status}`);
        }
    } catch(error) {
        console.error('❌ Error sending job:', error);
    }
},{connection});

worker.on('completed', job => {
    console.log(`✔️ Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`❌ Job ${job.id} failed with error:`, err);
});

module.exports = worker;