import { NextRequest, NextResponse } from "next/server";

// Mock availability data - in production, this would come from a database
const availabilityData: Record<string, {
  program: string;
  ageRange: string;
  status: "available" | "limited" | "waitlist";
  spotsAvailable?: number;
  waitlistCount?: number;
}[]> = {
  "plano-oak-point": [
    { program: "Infants", ageRange: "6 weeks - 1 year", status: "waitlist", waitlistCount: 3 },
    { program: "Toddlers", ageRange: "1-2 years", status: "limited", spotsAvailable: 2 },
    { program: "Two's", ageRange: "2-3 years", status: "available", spotsAvailable: 5 },
    { program: "Preschool", ageRange: "3-4 years", status: "available", spotsAvailable: 8 },
    { program: "Pre-K", ageRange: "4-5 years", status: "limited", spotsAvailable: 3 },
  ],
  "mckinney-central": [
    { program: "Infants", ageRange: "6 weeks - 1 year", status: "limited", spotsAvailable: 1 },
    { program: "Toddlers", ageRange: "1-2 years", status: "available", spotsAvailable: 4 },
    { program: "Two's", ageRange: "2-3 years", status: "available", spotsAvailable: 6 },
    { program: "Preschool", ageRange: "3-4 years", status: "available", spotsAvailable: 10 },
    { program: "Pre-K", ageRange: "4-5 years", status: "available", spotsAvailable: 7 },
  ],
  "frisco-north": [
    { program: "Infants", ageRange: "6 weeks - 1 year", status: "available", spotsAvailable: 2 },
    { program: "Toddlers", ageRange: "1-2 years", status: "available", spotsAvailable: 5 },
    { program: "Two's", ageRange: "2-3 years", status: "limited", spotsAvailable: 2 },
    { program: "Preschool", ageRange: "3-4 years", status: "available", spotsAvailable: 12 },
    { program: "Pre-K", ageRange: "4-5 years", status: "available", spotsAvailable: 8 },
  ],
};

// Default availability for locations not in the mock data
const defaultAvailability = [
  { program: "Infants", ageRange: "6 weeks - 1 year", status: "limited" as const, spotsAvailable: 1 },
  { program: "Toddlers", ageRange: "1-2 years", status: "available" as const, spotsAvailable: 4 },
  { program: "Two's", ageRange: "2-3 years", status: "available" as const, spotsAvailable: 6 },
  { program: "Preschool", ageRange: "3-4 years", status: "available" as const, spotsAvailable: 10 },
  { program: "Pre-K", ageRange: "4-5 years", status: "available" as const, spotsAvailable: 7 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationSlug = searchParams.get("location");

  // Simulate database lookup delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (locationSlug) {
    // Return availability for specific location
    const availability = availabilityData[locationSlug] || defaultAvailability;
    
    return NextResponse.json({
      success: true,
      data: {
        location: locationSlug,
        programs: availability,
        lastUpdated: new Date().toISOString(),
      },
    });
  }

  // Return all locations availability
  const allAvailability = Object.entries(availabilityData).map(([slug, programs]) => ({
    location: slug,
    programs,
    lastUpdated: new Date().toISOString(),
  }));

  return NextResponse.json({
    success: true,
    data: allAvailability,
  });
}

