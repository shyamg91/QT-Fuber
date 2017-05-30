const express = require('express');
const router = express.Router();

const dispatchController = require('./dispatch');
const {catchErrors} = require('../handlers/errorHandlers');


router.get('/', catchErrors(dispatchController.getRoot));
router.get('/driver', catchErrors(dispatchController.getNearestDriver));
router.post('/accept/:id', catchErrors(dispatchController.allocateDriver));
module.exports = router;
