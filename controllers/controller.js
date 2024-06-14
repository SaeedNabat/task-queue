const taskQueue = require('../queue/queue');


const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
};

const incomeHandler = async (req, res) => {
    try {
        const { id, userId } = req.body;
        const job = await taskQueue.add('processIncomingTask', { id, userId });
        console.log(`✔️ Job ${job.id} added to the queue`);
        return res.status(200).json({ jobId: job.id, message: 'Task added to queue' });
    } catch (error) {
        handleError(res, error);
    }
};

const outcomeByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await taskQueue.getJob(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        console.log(`✔️ Job ${job.id} retrieved from the queue`);
        console.table({
            id: job.data.id,
            userId: job.data.userId,
            job: job.id
        })
        return res.status(200).json({
            message: 'Job received',
            id: job.data.id,
            userId: job.data.userId,
            status: job.status
        });
    } catch (error) {
        handleError(res, error);
    }
};

const outcomeHandler = async (req, res) => {
    try {
        const jobs = await taskQueue.getJobs(['completed', 'failed']);
        return res.status(200).json({ jobs });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    incomeHandler,
    outcomeByIdHandler,
    outcomeHandler,
};