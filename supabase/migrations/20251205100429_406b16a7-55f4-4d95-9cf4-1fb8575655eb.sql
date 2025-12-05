-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public contact form)
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view all messages" 
ON public.contact_messages 
FOR SELECT 
USING (is_admin());

-- Only admins can update (mark as read/archive)
CREATE POLICY "Admins can update messages" 
ON public.contact_messages 
FOR UPDATE 
USING (is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete messages" 
ON public.contact_messages 
FOR DELETE 
USING (is_admin());