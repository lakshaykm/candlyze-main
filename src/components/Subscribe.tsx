import React, { useState } from "react";

interface SubscribeProps {
    planId: string;
    userEmail: string;
}

const Subscribe: React.FC<SubscribeProps> = ({ planId, userEmail }) => {
    const [loading, setLoading] = useState(false);

    const handleSubscription = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://candlyze-main-1.onrender.com/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId, customerEmail: userEmail }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.subscriptionId) {
                const options = {
                    key: "rzp_test_olwgvDPZtHPkhp", // Replace with your actual Razorpay Key ID
                    subscription_id: data.subscriptionId,
                    name: "CandlyzeAI",
                    description: "Subscription Payment",
                    handler: function (response: any) {
                        console.log("Payment successful", response);
                        alert("Subscription successful!");
                    },
                    theme: { color: "#3399cc" },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            setLoading(false);
            console.error("Error creating subscription", error);
        }
    };

    return (
        <button onClick={handleSubscription} disabled={loading}>
            {loading ? "Processing..." : "Subscribe Now"}
        </button>
    );
};

export default Subscribe;
