import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily reminder check...');
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Get all active reminders that are due today or overdue
    const { data: reminders, error: fetchError } = await supabase
      .from('budget_reminders')
      .select('*')
      .eq('is_active', true)
      .lte('next_due_date', todayStr);

    if (fetchError) {
      console.error('Error fetching reminders:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${reminders?.length || 0} reminders to process`);

    const results = [];
    
    for (const reminder of (reminders || [])) {
      try {
        // Get user email
        const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(
          reminder.user_id
        );

        if (userError || !user?.email) {
          console.error(`Error fetching user ${reminder.user_id}:`, userError);
          continue;
        }

        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(reminder.amount);

        const formattedDate = new Date(reminder.next_due_date).toLocaleDateString();
        const daysOverdue = Math.floor((today.getTime() - new Date(reminder.next_due_date).getTime()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysOverdue > 0;

        // Send email notification if enabled
        if (reminder.email_notifications) {
          const emailResponse = await resend.emails.send({
            from: "Mite Fi Reminders <notifications@resend.dev>",
            to: [user.email],
            subject: isOverdue 
              ? `⚠️ OVERDUE: ${reminder.name}` 
              : `📅 Reminder: ${reminder.name} Due Today`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 24px;">
                    ${isOverdue ? '⚠️ Payment Overdue' : '📅 Payment Due Today'}
                  </h1>
                </div>
                
                <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
                  <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h2 style="color: #1f2937; margin-top: 0;">${reminder.name}</h2>
                    
                    <div style="display: flex; justify-content: space-between; margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
                      <div>
                        <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">Amount Due</p>
                        <p style="margin: 5px 0; color: #10b981; font-size: 24px; font-weight: bold;">
                          ${formattedAmount}
                        </p>
                      </div>
                      <div>
                        <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">Due Date</p>
                        <p style="margin: 5px 0; color: ${isOverdue ? '#ef4444' : '#f59e0b'}; font-size: 18px; font-weight: bold;">
                          ${formattedDate}
                        </p>
                      </div>
                    </div>
                    
                    ${isOverdue ? `
                      <div style="background-color: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <strong>⚠️ This payment is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue.</strong> 
                        Please make this payment immediately to avoid late fees or service interruption.
                      </div>
                    ` : `
                      <div style="background-color: #fef3c7; color: #92400e; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <strong>📅 This payment is due today.</strong> 
                        Make sure to complete this payment to avoid any late fees.
                      </div>
                    `}
                    
                    ${reminder.description ? `
                      <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #667eea; border-radius: 4px;">
                        <p style="margin: 0; color: #4b5563; font-size: 14px;">
                          <strong>Note:</strong> ${reminder.description}
                        </p>
                      </div>
                    ` : ''}
                  </div>
                </div>
                
                <div style="background-color: #1f2937; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                  <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    This is an automated reminder from Mite Fi. 
                    <br>Manage your reminders at <a href="${Deno.env.get('SUPABASE_URL')}/reminders" style="color: #818cf8;">mitefi.com/reminders</a>
                  </p>
                </div>
              </div>
            `,
          });

          console.log(`Email sent to ${user.email} for reminder: ${reminder.name}`);
          results.push({ 
            reminder: reminder.name, 
            type: 'email', 
            status: 'sent',
            recipient: user.email 
          });
        }

        // Log SMS notification (would need Twilio integration for actual SMS)
        if (reminder.phone_notifications && reminder.phone_number) {
          console.log(`SMS notification would be sent to ${reminder.phone_number} for: ${reminder.name}`);
          results.push({ 
            reminder: reminder.name, 
            type: 'sms', 
            status: 'logged',
            recipient: reminder.phone_number 
          });
        }

        // Update next due date for recurring reminders
        if (reminder.frequency !== 'once' && !isOverdue) {
          const nextDate = new Date(reminder.next_due_date);
          
          switch (reminder.frequency) {
            case 'daily':
              nextDate.setDate(nextDate.getDate() + 1);
              break;
            case 'weekly':
              nextDate.setDate(nextDate.getDate() + 7);
              break;
            case 'monthly':
              nextDate.setMonth(nextDate.getMonth() + 1);
              break;
            case 'yearly':
              nextDate.setFullYear(nextDate.getFullYear() + 1);
              break;
          }

          const { error: updateError } = await supabase
            .from('budget_reminders')
            .update({ next_due_date: nextDate.toISOString().split('T')[0] })
            .eq('id', reminder.id);

          if (updateError) {
            console.error(`Error updating next due date for reminder ${reminder.id}:`, updateError);
          } else {
            console.log(`Updated next due date for ${reminder.name} to ${nextDate.toISOString().split('T')[0]}`);
          }
        }
      } catch (reminderError) {
        console.error(`Error processing reminder ${reminder.id}:`, reminderError);
        results.push({ 
          reminder: reminder.name, 
          type: 'error', 
          status: 'failed',
          error: String(reminderError) 
        });
      }
    }

    console.log('Daily reminder check completed:', results);

    return new Response(JSON.stringify({ 
      success: true,
      processed: reminders?.length || 0,
      results
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in check-and-send-reminders function:", error);
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