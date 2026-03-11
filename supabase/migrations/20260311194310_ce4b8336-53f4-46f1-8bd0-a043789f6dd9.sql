
-- Add validation constraints to contact_messages
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT contact_email_length CHECK (char_length(email) BETWEEN 5 AND 255),
  ADD CONSTRAINT contact_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT contact_phone_length CHECK (phone IS NULL OR char_length(phone) BETWEEN 8 AND 20),
  ADD CONSTRAINT contact_subject_length CHECK (char_length(subject) BETWEEN 2 AND 100),
  ADD CONSTRAINT contact_message_length CHECK (char_length(message) BETWEEN 10 AND 5000);

-- Add validation constraints to health_check_registrations
ALTER TABLE public.health_check_registrations
  ADD CONSTRAINT hc_name_length CHECK (char_length(full_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT hc_email_length CHECK (char_length(email) BETWEEN 5 AND 255),
  ADD CONSTRAINT hc_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT hc_phone_length CHECK (char_length(phone) BETWEEN 8 AND 20),
  ADD CONSTRAINT hc_message_length CHECK (message IS NULL OR char_length(message) <= 2000);
