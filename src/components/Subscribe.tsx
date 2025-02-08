import React, { useState, useEffect } from "react";

interface SubscribeProps {
    planId: string;
    userEmail: string;
}

const Subscribe: React.FC<SubscribeProps> = ({ planId, userEmail }) => {
    const [loading, setLoading] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    useEffect(() => {
        // Check if the user is already subscribed
        const checkSubscription = async () => {
            try {
                const response = await fetch(`https://candlyze-main-1.onrender.com/check-subscription?email=${userEmail}`);
                const data = await response.json();
                setIsSubscribed(data.isActive);
            } catch (error) {
                console.error("Error checking subscription", error);
            }
        };
        checkSubscription();
    }, [userEmail]);

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
                setSubscriptionId(data.subscriptionId);
                const options = {
                    key: "rzp_test_olwgvDPZtHPkhp",
                    subscription_id: data.subscriptionId,
                    name: "CandlyzeAI",
                    description: "Subscription Payment",
                    handler: function (response: any) {
                        console.log("Payment successful", response);
                        alert("Subscription successful!");
                        setIsSubscribed(true);
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
        <>
            {isSubscribed ? (
                <button disabled className="bg-green-500 text-white px-6 py-3 rounded-md">
                    Subscribed
                </button>
            ) : (
                <button onClick={handleSubscription} disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-md">
                    {loading ? "Processing..." : "Subscribe Now"}
                </button>
            )}
        </>
    );
};

export default Subscribe;
