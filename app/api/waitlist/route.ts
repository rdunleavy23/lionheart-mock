import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for waitlist signup
const waitlistSchema = z.object({
  location: z.string().min(1, "Location is required"),
  program: z.string().min(1, "Program is required"),
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  childDateOfBirth: z.string().optional(),
  desiredStartDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = waitlistSchema.parse(body);

    // In production, you would:
    // 1. Check if family is already on waitlist
    // 2. Add to waitlist in database
    // 3. Send confirmation email
    // 4. Calculate estimated wait time
    // 5. Notify admissions team

    console.log("Waitlist signup received:", validatedData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock waitlist position
    const waitlistPosition = Math.floor(Math.random() * 5) + 1;

    return NextResponse.json(
      {
        success: true,
        message: "Successfully added to waitlist",
        data: {
          confirmationNumber: `WL-${Date.now().toString(36).toUpperCase()}`,
          waitlistPosition,
          estimatedWait: `${waitlistPosition * 2}-${waitlistPosition * 4} weeks`,
          ...validatedData,
          signedUpAt: new Date().toISOString(),
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

    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while adding you to the waitlist. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const program = searchParams.get("program");

  // In production, this would return waitlist statistics
  return NextResponse.json({
    success: true,
    data: {
      location: location || "all",
      program: program || "all",
      currentWaitlistLength: Math.floor(Math.random() * 10) + 1,
      averageWaitTime: "4-6 weeks",
      lastUpdated: new Date().toISOString(),
    },
  });
}

