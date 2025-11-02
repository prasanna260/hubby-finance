import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting weekly newsletter send...");

    // Fetch all subscribed users
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("subscribed", true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw subscribersError;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No subscribers found");
      return new Response(
        JSON.stringify({ message: "No subscribers to send newsletter to" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${subscribers.length} subscribers`);

    // Generate newsletter content (you can customize this based on preferences)
    const newsletterHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Mite Fi Weekly Newsletter</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .section { margin-bottom: 25px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          h1 { margin: 0; font-size: 28px; }
          h2 { color: #667eea; font-size: 20px; margin-top: 0; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .unsubscribe { color: #999; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Your Weekly Financial Update</h1>
            <p>Stay informed with the latest market trends and portfolio insights</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>🎯 This Week's Highlights</h2>
              <ul>
                <li><strong>Market Overview:</strong> S&P 500 up 1.2% this week</li>
                <li><strong>Top Dividend Stock:</strong> Johnson & Johnson yielding 3.1%</li>
                <li><strong>Crypto Update:</strong> Bitcoin showing strong support at $45,000</li>
                <li><strong>Real Estate:</strong> Mortgage rates stabilizing at 6.8%</li>
              </ul>
            </div>

            <div class="section">
              <h2>💡 Financial Tip of the Week</h2>
              <p>Review your subscription services this week! The average household has 12 active subscriptions. Canceling just 2-3 unused services could save you $50-100 per month.</p>
              <a href="https://mitefi.com/subscriptions" class="button">Manage Your Subscriptions</a>
            </div>

            <div class="section">
              <h2>📈 Portfolio Performance Tips</h2>
              <p>Don't forget to rebalance your portfolio quarterly. Our data shows that regular rebalancing can improve returns by up to 1.5% annually while reducing risk.</p>
              <a href="https://mitefi.com/dashboard" class="button">View Your Dashboard</a>
            </div>

            <div class="section">
              <h2>🔔 Upcoming Reminders</h2>
              <p>Stay on top of your financial obligations:</p>
              <ul>
                <li>Quarterly tax payments due in 2 weeks</li>
                <li>Annual insurance review recommended</li>
                <li>401(k) contribution limits increased for 2025</li>
              </ul>
              <a href="https://mitefi.com/reminders" class="button">Set Up Reminders</a>
            </div>

            <div class="section">
              <h2>📰 Latest Financial News</h2>
              <p>Stay informed with our curated financial news:</p>
              <ul>
                <li>Federal Reserve signals potential rate cuts in Q2 2025</li>
                <li>New tax deductions available for remote workers</li>
                <li>ESG investing continues to gain momentum</li>
              </ul>
              <a href="https://mitefi.com/news" class="button">Read More News</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 Mite Fi - Your Personal Finance Companion</p>
            <p>
              <a href="https://mitefi.com/profile" class="unsubscribe">Manage Email Preferences</a> | 
              <a href="https://mitefi.com/security" class="unsubscribe">Privacy Policy</a>
            </p>
            <p style="color: #999; font-size: 12px;">
              You're receiving this email because you subscribed to Mite Fi's newsletter.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        const emailResponse = await resend.emails.send({
          from: "Mite Fi Newsletter <newsletter@mitefi.com>",
          to: [subscriber.email],
          subject: "📊 Your Weekly Mite Fi Financial Update",
          html: newsletterHtml,
        });

        console.log(`Email sent successfully to ${subscriber.email}:`, emailResponse);
        return { email: subscriber.email, success: true, response: emailResponse };
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
        return { email: subscriber.email, success: false, error: error };
      }
    });

    const results = await Promise.all(emailPromises);
    
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Newsletter send complete. Success: ${successCount}, Failed: ${failureCount}`);

    // Log newsletter send to database
    const { error: logError } = await supabase
      .from("newsletter_logs")
      .insert({
        sent_at: new Date().toISOString(),
        recipients_count: subscribers.length,
        success_count: successCount,
        failure_count: failureCount,
        status: failureCount === 0 ? 'success' : 'partial',
      });

    if (logError) {
      console.error("Error logging newsletter send:", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Newsletter sent to ${successCount} subscribers`,
        details: {
          total: subscribers.length,
          success: successCount,
          failed: failureCount,
          results: results
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-weekly-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);