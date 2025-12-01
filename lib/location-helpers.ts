import type { Location } from "./locations-data";

// Age group display configuration
export const ageGroupConfig: Record<
  string,
  { label: string; ageRange: string; slug: string }
> = {
  infants: {
    label: "Infant Care",
    ageRange: "6 weeks – 12 months",
    slug: "infants",
  },
  toddlers: {
    label: "Toddlers",
    ageRange: "12 – 24 months",
    slug: "toddlers",
  },
  preschool: {
    label: "Preschool",
    ageRange: "2 – 4 years",
    slug: "preschool",
  },
  "pre-k": {
    label: "Pre-K & Kindergarten Prep",
    ageRange: "4 – 5 years",
    slug: "pre-k",
  },
  kindergarten: {
    label: "Kindergarten",
    ageRange: "5 – 6 years",
    slug: "kindergarten",
  },
};

/**
 * Get display info for an age group
 */
export function getAgeGroupInfo(ageGroup: string) {
  return (
    ageGroupConfig[ageGroup] || {
      label: ageGroup,
      ageRange: "",
      slug: ageGroup.toLowerCase().replace(/\s+/g, "-"),
    }
  );
}

/**
 * Format address with line breaks
 */
export function formatAddress(address: string): string[] {
  // Split by comma and return array for display
  return address.split(",").map((part) => part.trim());
}
