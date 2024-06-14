const express = require('express');
const router = express.Router();
const { incomeHandler, outcomeByIdHandler, outcomeHandler} = require('../controllers/controller')
const { validateIdParam, validateIncomeRequest } = require('../validators/validators')


router.post('/incoming', validateIncomeRequest, incomeHandler)

// * get job by id
router.get('/outcoming/:id', validateIdParam, outcomeByIdHandler);

// * get all completed and failed jobs
router.get('/outcoming', outcomeHandler)
module.exports = router;