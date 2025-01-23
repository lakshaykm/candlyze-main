import React from 'react';
import axios from 'axios';

interface PaymentProps {
  planName: string; // Name of the subscription plan
  planPrice: number; // Price of the subscription plan
}

const Payment: React.FC<PaymentProps> = ({ planName, planPrice }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order by calling your backend
      const response = await axios.post('https://your-backend-url.onrender.com/create-order', {
        amount: planPrice * 100, // Amount in paise
        currency: 'INR',
      });

      const { id: order_id, amount, currency } = response.data;

      // Step 2: Configure Razorpay options
      const options: Razorpay.Options = {
        key: 'your_key_id', // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: 'Your App Name',
        description: `${planName} Subscription Plan`,
        order_id: order_id,
        handler: (response: Razorpay.PaymentSuccessResponse) => {
          // Step 3: Handle payment success
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally, send the payment response to your backend for verification
        },
        prefill: {
          name: 'Your Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Step 4: Open Razorpay checkout
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>{planName} Plan</h3>
      <p>Price: ₹{planPrice.toFixed(2)}</p>
      <button onClick={handlePayment}>Subscribe Now</button>
    </div>
  );
};

export default Payment;
