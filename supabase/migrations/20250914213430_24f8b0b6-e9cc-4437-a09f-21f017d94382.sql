-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create cron job to send newsletter every Sunday at 9:00 AM UTC
SELECT cron.schedule(
  'send-weekly-newsletter',
  '0 9 * * 0', -- Every Sunday at 9:00 AM UTC
  $$
  SELECT net.http_post(
    url:='https://xhvfyvkckqhalqhosisp.supabase.co/functions/v1/send-weekly-newsletter',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodmZ5dmtja3FoYWxxaG9zaXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDg2NTAsImV4cCI6MjA2NjYyNDY1MH0.fpvHvJrdG7_vNvRPWrTglfCM1QzheTh96eRI7t9DurM"}'::jsonb,
    body:='{"trigger": "scheduled"}'::jsonb
  ) as request_id;
  $$
);