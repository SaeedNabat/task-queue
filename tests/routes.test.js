const request = require('supertest');
const app = require('../index'); // Assuming your app is exported as 'app'

describe('POST /incoming', () => {
    it('responds with status 200 and jobId if request is valid', async () => {
        const response = await request(app)
            .post('/incoming')
            .send({ id: 1, userId: 123 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('jobId');
    });

    it('responds with status 400 if request body is invalid', async () => {
        const response = await request(app)
            .post('/incoming')
            .send({ id: 'invalid', userId: 'invalid' });
        expect(response.status).toBe(400);
    });
});

describe('GET /outcoming/:id', () => {
    it('responds with status 400 when job id is invalid', async () => {
        // Assuming you have a valid job id to test
        const jobId = 'valid-job-id';
        const response = await request(app).get(`/outcoming/${jobId}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid id parameter');
    });

    it('responds with status 400 if job id is invalid', async () => {
        const response = await request(app).get('/outcoming/invalid-job-id');
        expect(response.status).toBe(400);
    });

    it('responds with status 404 if job does not exist', async () => {
        // Assuming you have an invalid job id to test
        const jobId = '1000000000000';
        const response = await request(app).get(`/outcoming/${jobId}`);
        expect(response.status).toBe(404);
    });
});

describe('GET /outcoming', () => {
    it('responds with status 200 and list of jobs', async () => {
        const response = await request(app).get('/outcoming');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('jobs');
    });
});