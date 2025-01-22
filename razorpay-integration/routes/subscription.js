const express = require('express');
const { createSubscription } = require('../controllers/subscriptionController');
const router = express.Router();

router.post('/create', createSubscription);

module.exports = router;
