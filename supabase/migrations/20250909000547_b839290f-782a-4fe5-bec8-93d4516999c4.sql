-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a cron job to check and send reminders daily at 9 AM
SELECT cron.schedule(
  'check-daily-reminders',
  '0 9 * * *', -- Run daily at 9:00 AM
  $$
  SELECT
    net.http_post(
        url:='https://xhvfyvkckqhalqhosisp.supabase.co/functions/v1/check-and-send-reminders',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodmZ5dmtja3FoYWxxaG9zaXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDg2NTAsImV4cCI6MjA2NjYyNDY1MH0.fpvHvJrdG7_vNvRPWrTglfCM1QzheTh96eRI7t9DurM"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);