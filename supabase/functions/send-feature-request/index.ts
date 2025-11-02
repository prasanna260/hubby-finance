
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeatureRequestData {
  name: string;
  email: string;
  featureTitle: string;
  description: string;
  priority: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const featureData: FeatureRequestData = await req.json();
    
    console.log("Processing feature request:", featureData);

    // Send email to contact@mitefi.com
    const emailResponse = await resend.emails.send({
      from: "Feature Requests <noreply@mitefi.com>",
      to: ["contact@mitefi.com"],
      subject: `New Feature Request: ${featureData.featureTitle}`,
      html: `
        <h2>New Feature Request Submitted</h2>
        <p><strong>From:</strong> ${featureData.name} (${featureData.email})</p>
        <p><strong>Priority:</strong> ${featureData.priority}</p>
        <p><strong>Feature Title:</strong> ${featureData.featureTitle}</p>
        <h3>Description:</h3>
        <p>${featureData.description.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Submitted via Mite Fi Feature Request Form</em></p>
      `,
    });

    console.log("Email response from Resend:", JSON.stringify(emailResponse, null, 2));

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email", 
          details: emailResponse.error 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Feature request submitted successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-feature-request function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
