import React from "react";

const Subscribe = ({ planId, userEmail }) => {
    const handleSubscription = async () => {
        try {
            const response = await fetch("http://localhost:5000/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId, customerEmail: userEmail }),
            });

            const data = await response.json();

            if (data.subscriptionId) {
                const options = {
                    key: "rzp_test_olwgvDPZtHPkhp",
                    subscription_id: data.subscriptionId,
                    name: "CandlyzeAI",
                    description: "Subscription Payment",
                    handler: function (response) {
                        console.log("Payment successful", response);
                        alert("Subscription successful!");
                    },
                    theme: { color: "#3399cc" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error("Error creating subscription", error);
        }
    };

    return <button onClick={handleSubscription}>Subscribe Now</button>;
};

export default Subscribe;
