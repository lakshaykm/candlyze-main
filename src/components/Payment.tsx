import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  // Redirect to Pricing Section if no plan details are provided
  if (!plan) {
    navigate('/pricing');
    return null;
  }

  const { name: planName, priceUSD: planPrice } = plan;

  const handlePayment = async () => {
    try {
      // Step 1: Create an order by calling your backend
      const response = await axios.post(
        'https://localhost:10000/create-order',
        {
          amount: planPrice * 100, // Amount in paise
          currency: 'INR',
        }
      );

      const { id: order_id, amount, currency } = response.data;

      // Step 2: Configure Razorpay options
      const options: Razorpay.Options = {
        key: rzp_test_olwgvDPZtHPkhp, // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: 'CandlyzeAI',
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
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <h3>{planName} Plan</h3>
      <p>Price: ₹{(planPrice * 82).toFixed(2)}</p> {/* Assuming 1 USD = 82 INR */}
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3399cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Subscribe Now
      </button>
    </div>
  );
};

export default Payment;
