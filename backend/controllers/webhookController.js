const Razorpay = require('razorpay');

exports.handleWebhook = (req, res) => {
    const webhookSecret = 'your_webhook_secret';
    const receivedSignature = req.headers['x-razorpay-signature'];
    const isValid = Razorpay.validateWebhookSignature(
        JSON.stringify(req.body),
        receivedSignature,
        webhookSecret
    );

    if (isValid) {
        console.log('Webhook Event:', req.body.event);
        res.status(200).send('Webhook processed successfully');
    } else {
        res.status(400).send('Invalid webhook signature');
    }
};
