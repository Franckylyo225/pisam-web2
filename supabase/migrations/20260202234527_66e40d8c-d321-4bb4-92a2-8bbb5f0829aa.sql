-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Admins can view all subscriptions
CREATE POLICY "Admins can view newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (is_admin());

-- Admins can delete subscriptions
CREATE POLICY "Admins can delete newsletter subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
USING (is_admin());