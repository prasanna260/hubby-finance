import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReminderNotificationRequest {
  reminderName: string;
  amount: number;
  dueDate: string;
  email: string;
  phoneNumber?: string;
  sendEmail: boolean;
  sendSMS: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      reminderName, 
      amount, 
      dueDate, 
      email, 
      phoneNumber, 
      sendEmail, 
      sendSMS 
    }: ReminderNotificationRequest = await req.json();

    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    const formattedDate = new Date(dueDate).toLocaleDateString();

    let emailResponse = null;
    let smsResponse = null;

    // Send email notification
    if (sendEmail && email) {
      emailResponse = await resend.emails.send({
        from: "Budget Tracker <notifications@resend.dev>",
        to: [email],
        subject: `Reminder: ${reminderName} Due Soon`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              💰 Payment Reminder
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">${reminderName}</h3>
              <p style="font-size: 18px; margin: 10px 0;">
                <strong>Amount:</strong> <span style="color: #28a745;">${formattedAmount}</span>
              </p>
              <p style="font-size: 16px; margin: 10px 0;">
                <strong>Due Date:</strong> ${formattedDate}
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              This is an automated reminder from your Budget Tracker. 
              Make sure to complete this payment on time to avoid any late fees.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
              <p>Best regards,<br>Your Budget Tracker Team</p>
            </div>
          </div>
        `,
      });
    }

    // Note: SMS functionality would require integration with services like Twilio
    // For now, we'll just log that SMS was requested
    if (sendSMS && phoneNumber) {
      console.log(`SMS notification requested for ${phoneNumber}: ${reminderName} - ${formattedAmount} due ${formattedDate}`);
      smsResponse = { 
        message: "SMS notification logged (Twilio integration required for actual SMS)",
        phoneNumber,
        content: `Reminder: ${reminderName} - ${formattedAmount} due ${formattedDate}`
      };
    }

    console.log("Notification sent successfully:", { emailResponse, smsResponse });

    return new Response(JSON.stringify({ 
      success: true,
      emailResponse,
      smsResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reminder-notifications function:", error);
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