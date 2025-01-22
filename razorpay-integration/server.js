require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Import routes
const subscriptionRoutes = require('./routes/subscription');
const webhookRoutes = require('./routes/webhook');

// Use routes
app.use('/subscription', subscriptionRoutes);
app.use('/webhook', webhookRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
