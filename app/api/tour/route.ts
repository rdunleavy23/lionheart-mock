import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for tour booking
const tourSchema = z.object({
  location: z.string().min(1, "Location is required"),
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  childName: z.string().optional(),
  childAge: z.string().min(1, "Child's age is required"),
  startDate: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = tourSchema.parse(body);

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify location staff
    // 4. Create calendar event
    // 5. Add to CRM

    console.log("Tour booking received:", validatedData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Tour scheduled successfully",
        data: {
          confirmationNumber: `LH-${Date.now().toString(36).toUpperCase()}`,
          ...validatedData,
          scheduledAt: new Date().toISOString(),
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

    console.error("Tour booking error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while scheduling your tour. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Tour scheduling API. Use POST to schedule a tour.",
      endpoints: {
        POST: {
          description: "Schedule a new tour",
          body: {
            location: "string (required)",
            parentName: "string (required)",
            email: "string (required)",
            phone: "string (optional)",
            childName: "string (optional)",
            childAge: "string (required)",
            startDate: "string (optional)",
            preferredDate: "string (optional)",
            preferredTime: "string (optional)",
            additionalInfo: "string (optional)",
          },
        },
      },
    },
    { status: 200 }
  );
}

