const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'Invalid id parameter' });
    }
    next();
};

const validateIncomeRequest = (req, res, next) => {
    const { id, userId } = req.body;
    if (!id || !userId || isNaN(parseInt(id)) || isNaN(parseInt(userId))) {
        return res.status(400).json({ message: 'Bad request' });
    }
    next();
};

module.exports = {
    validateIdParam,
    validateIncomeRequest
}