/*
  # Add subscription transaction function
  
  1. New Functions
    - `update_subscription_and_credits`: Updates subscription status and user credits in a single transaction
      - Parameters:
        - p_subscription_id (uuid): Subscription ID
        - p_razorpay_subscription_id (text): Razorpay subscription ID
        - p_user_id (uuid): User ID
        - p_credits (integer): Number of credits to set
        - p_plan_name (text): Name of the plan
*/

-- Function to update subscription and credits in a transaction
CREATE OR REPLACE FUNCTION update_subscription_and_credits(
  p_subscription_id uuid,
  p_razorpay_subscription_id text,
  p_user_id uuid,
  p_credits integer,
  p_plan_name text
) RETURNS void AS $$
BEGIN
  -- Begin transaction
  BEGIN
    -- Update subscription status to active
    UPDATE subscriptions
    SET 
      status = 'active',
      razorpay_subscription_id = p_razorpay_subscription_id,
      updated_at = now()
    WHERE id = p_subscription_id;

    -- Update user credits
    INSERT INTO user_credits (user_id, credits, plan)
    VALUES (p_user_id, p_credits, p_plan_name)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      credits = EXCLUDED.credits,
      plan = EXCLUDED.plan,
      updated_at = now();

    -- Commit transaction
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      -- Rollback transaction on error
      ROLLBACK;
      RAISE;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
