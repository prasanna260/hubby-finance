-- Update the weekly newsletter cron schedule to 7:00 PM UTC every Sunday
SELECT cron.unschedule('send-weekly-newsletter');

SELECT cron.schedule(
  'send-weekly-newsletter',
  '0 19 * * 0', -- 7:00 PM UTC every Sunday
  $$
  SELECT
    net.http_post(
      url:='https://xhvfyvkckqhalqhosisp.supabase.co/functions/v1/send-weekly-newsletter',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodmZ5dmtja3FoYWxxaG9zaXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDg2NTAsImV4cCI6MjA2NjYyNDY1MH0.fpvHvJrdG7_vNvRPWrTglfCM1QzheTh96eRI7t9DurM"}'::jsonb,
      body:='{}'::jsonb
    ) as request_id;
  $$
);