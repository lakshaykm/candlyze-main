import React from 'react';
import axios from 'axios';

const Payment = ({ planName, planPrice }) => {
    const handlePayment = async () => {
        try {
            // Step 1: Create an order by calling your backend
            const response = await axios.post('https://your-backend-url.onrender.com/create-order', {
                amount: planPrice * 100, // Amount in paise
                currency: 'INR',
            });

            const { id: order_id, amount, currency } = response.data;

            // Step 2: Configure Razorpay options
            const options = {
                key: "your_key_id", // Replace with your Razorpay Key ID
                amount: amount,
                currency: currency,
                name: "Your App Name",
                description: `${planName} Subscription Plan`,
                order_id: order_id,
                handler: function (response) {
                    // Step 3: Handle payment success
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    // You can also make an API call to your backend here to save the payment details
                },
                prefill: {
                    name: "Your Customer Name",
                    email: "customer@example.com",
                    contact: "1234567890",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            // Step 4: Open Razorpay checkout
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Error during payment:", error);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            <h3>{planName} Plan</h3>
            <p>Price: ₹{planPrice}</p>
            <button onClick={handlePayment}>Subscribe Now</button>
        </div>
    );
};

export default Payment;
