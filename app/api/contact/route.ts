import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactPreference: z.enum(["email", "phone", "either"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // In production, you would:
    // 1. Save to database
    // 2. Send notification to appropriate team
    // 3. Send confirmation email to sender
    // 4. Create ticket in support system
    // 5. Log for analytics

    console.log("Contact form submission:", validatedData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us. We'll get back to you within 24 hours.",
        data: {
          ticketNumber: `CT-${Date.now().toString(36).toUpperCase()}`,
          ...validatedData,
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while sending your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Contact form API. Use POST to submit a message.",
      endpoints: {
        POST: {
          description: "Submit a contact form",
          body: {
            name: "string (required)",
            email: "string (required)",
            phone: "string (optional)",
            location: "string (optional)",
            subject: "string (required)",
            message: "string (required, min 10 chars)",
            contactPreference: "email | phone | either (optional)",
          },
        },
      },
    },
    { status: 200 }
  );
}

