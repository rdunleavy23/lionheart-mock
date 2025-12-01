export type Location = {
  slug: string;
  name: string;
  label?: string;
  shortName?: string; // e.g. "Arvada"
  state: string;
  city: string;
  neighborhood?: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  isComingSoon?: boolean;
  phone?: string;
  email?: string;
  distance?: number; // Calculated distance from user
  hours?: string; // e.g. "Monday - Friday, 7:00 AM - 6:00 PM"
  ageGroups?: string[]; // e.g. ["infants", "toddlers", "preschool", "pre-k", "kindergarten"]
  accreditation?: string[]; // e.g. ["State licensed", "NAEYC accredited"]
  director?: {
    name: string;
    role: string;
    bio: string;
  };
  staff?: Array<{
    name: string;
    role: string;
    bio?: string;
  }>;
  gallery?: string[]; // image URLs or placeholder strings
  testimonials?: Array<{
    quote: string;
    name: string;
    childAge: string;
  }>;
};

// Real location data - 25 locations across 5 states
export const locations: Location[] = [
  // Colorado
  {
    slug: "arvada",
    name: "Lionheart Children's Academy – Arvada",
    label: "Arvada, CO",
    shortName: "Arvada",
    state: "Colorado",
    city: "Arvada",
    fullAddress: "8210 Kipling St, Arvada, CO 80005",
    latitude: 39.8403,
    longitude: -105.1264,
    phone: "(303) 555-0100",
    email: "arvada@lionheartacademy.com",
    hours: "Monday - Friday, 7:00 AM - 6:00 PM",
    ageGroups: ["infants", "toddlers", "preschool", "pre-k", "kindergarten"],
    accreditation: ["State Licensed", "NAEYC Accredited"],
    director: {
      name: "Sarah Johnson",
      role: "Center Director",
      bio: "Sarah has been serving families in the Arvada community for over 10 years. She holds a Master's in Early Childhood Education and is passionate about creating nurturing environments where children thrive.",
    },
    staff: [
      {
        name: "Maria Rodriguez",
        role: "Lead Preschool Teacher",
        bio: "Maria brings 8 years of experience and a heart for helping children discover their unique gifts.",
      },
      {
        name: "James Wilson",
        role: "Infant Care Specialist",
        bio: "James is certified in infant development and creates safe, loving spaces for our youngest learners.",
      },
    ],
    gallery: [
      "Arvada infant classroom",
      "Arvada toddler play area",
      "Arvada preschool learning center",
      "Arvada outdoor playground",
      "Arvada art studio",
      "Arvada reading nook",
    ],
    testimonials: [
      {
        quote:
          "We found peace of mind knowing our daughter is safe, loved, and learning. The teachers truly care, and we see biblical values being taught every day.",
        name: "Jennifer M.",
        childAge: "parent of a 3-year-old",
      },
      {
        quote:
          "The quality of care is exceptional, and our son has grown so much socially and academically. We're grateful for the biblical foundations being woven into everything.",
        name: "Michael T.",
        childAge: "parent of a 4-year-old",
      },
      {
        quote:
          "As working parents, we needed somewhere we could trust completely. Lionheart Arvada has exceeded our expectations in every way—quality, safety, and faith integration.",
        name: "Lisa K.",
        childAge: "parent of twins, 2 years old",
      },
    ],
  },
  {
    slug: "colorado-springs",
    name: "Lionheart Children's Academy – Colorado Springs",
    label: "Colorado Springs, CO",
    state: "Colorado",
    city: "Colorado Springs",
    fullAddress: "2950 E Fountain Blvd, Colorado Springs, CO 80910",
    latitude: 38.8339,
    longitude: -104.8214,
  },
  // Indiana
  {
    slug: "fortville",
    name: "Lionheart Children's Academy – Fortville",
    label: "Fortville, IN",
    state: "Indiana",
    city: "Fishers",
    fullAddress: "11521 E 116th St, Fishers, IN 46037",
    latitude: 39.9561,
    longitude: -85.8472,
  },
  {
    slug: "greenwood",
    name: "Lionheart Children's Academy – Greenwood",
    label: "Greenwood, IN",
    state: "Indiana",
    city: "Greenwood",
    fullAddress: "1200 N State Road 135, Greenwood, IN 46142",
    latitude: 39.6137,
    longitude: -86.1067,
  },
  // Texas
  {
    slug: "arlington",
    name: "Lionheart Children's Academy – Arlington",
    label: "Arlington, TX",
    state: "Texas",
    city: "Arlington",
    fullAddress: "4000 W Pleasant Ridge Rd, Arlington, TX 76015",
    latitude: 32.7357,
    longitude: -97.1081,
  },
  {
    slug: "carrollton",
    name: "Lionheart Children's Academy – Carrollton",
    label: "Carrollton, TX",
    state: "Texas",
    city: "Carrollton",
    fullAddress: "2400 Josey Ln, Carrollton, TX 75006",
    latitude: 33.0165,
    longitude: -96.8903,
  },
  {
    slug: "euless",
    name: "Lionheart Children's Academy – Euless",
    label: "Euless, TX",
    state: "Texas",
    city: "Euless",
    fullAddress: "100 W Midway Dr, Euless, TX 76039",
    latitude: 32.8371,
    longitude: -97.0819,
  },
  {
    slug: "garland",
    name: "Lionheart Children's Academy – Garland",
    label: "Garland, TX",
    state: "Texas",
    city: "Garland",
    fullAddress: "2660 Belt Line Rd, Garland, TX 75044",
    latitude: 32.9126,
    longitude: -96.6389,
  },
  {
    slug: "georgetown",
    name: "Lionheart Children's Academy – Georgetown",
    label: "Georgetown, TX",
    state: "Texas",
    city: "Georgetown",
    fullAddress: "4909 Williams Dr, Georgetown, TX 78633",
    latitude: 30.6333,
    longitude: -97.6772,
  },
  {
    slug: "grapevine-121",
    name: "Lionheart Children's Academy – Grapevine (121CC)",
    label: "Grapevine, TX",
    state: "Texas",
    city: "Grapevine",
    fullAddress: "2701 Ira E. Woods Ave, Grapevine, TX 76051",
    latitude: 32.9343,
    longitude: -97.0781,
  },
  {
    slug: "grapevine-stone-myers",
    name: "Lionheart Children's Academy – Stone Myers",
    label: "Grapevine, TX",
    state: "Texas",
    city: "Grapevine",
    fullAddress: "3600 William D. Tate Ave, Grapevine, TX 76051",
    latitude: 32.9343,
    longitude: -97.0781,
  },
  {
    slug: "irving",
    name: "Lionheart Children's Academy – Irving",
    label: "Irving, TX",
    state: "Texas",
    city: "Irving",
    fullAddress: "8001 Mustang Dr, Irving, TX 75063",
    latitude: 32.8140,
    longitude: -96.9489,
  },
  {
    slug: "katy",
    name: "Lionheart Children's Academy – Katy",
    label: "Katy, TX",
    state: "Texas",
    city: "Houston",
    fullAddress: "18518 Green Land Way, Houston, TX 77084",
    latitude: 29.7858,
    longitude: -95.8244,
  },
  {
    slug: "mckinney",
    name: "Lionheart Children's Academy – McKinney",
    label: "McKinney, TX",
    shortName: "McKinney",
    state: "Texas",
    city: "McKinney",
    fullAddress: "6400 Henneman Way, McKinney, TX 75070",
    latitude: 33.1972,
    longitude: -96.6397,
    phone: "(972) 555-0102",
    email: "mckinney@lionheartacademy.com",
    hours: "Monday - Friday, 7:00 AM - 6:00 PM",
    ageGroups: ["infants", "toddlers", "preschool", "pre-k", "kindergarten"],
    accreditation: ["State Licensed", "NAEYC Accredited"],
    director: {
      name: "Patricia Martinez",
      role: "Center Director",
      bio: "Patricia has dedicated her career to early childhood education, bringing warmth and expertise to every interaction with children and families.",
    },
    gallery: [
      "McKinney infant room",
      "McKinney preschool classroom",
      "McKinney playground",
      "McKinney music room",
    ],
    testimonials: [
      {
        quote:
          "We love the McKinney center! Our daughter has flourished here, and we appreciate the biblical values integrated into daily learning.",
        name: "Robert S.",
        childAge: "parent of a 3-year-old",
      },
    ],
  },
  {
    slug: "plano-central",
    name: "Lionheart Children's Academy – Plano (Central Church)",
    label: "Plano, TX",
    state: "Texas",
    city: "Plano",
    fullAddress: "2301 Premier Dr, Plano, TX 75075",
    latitude: 33.0198,
    longitude: -96.6989,
  },
  {
    slug: "plano-fbc",
    name: "Lionheart Children's Academy – Plano (FBC Plano)",
    label: "Plano, TX",
    state: "Texas",
    city: "Plano",
    fullAddress: "3665 W 15th St, Plano, TX 75075",
    latitude: 33.0198,
    longitude: -96.6989,
  },
  {
    slug: "saginaw",
    name: "Lionheart Children's Academy – Saginaw",
    label: "Saginaw, TX",
    state: "Texas",
    city: "Fort Worth",
    fullAddress: "5455 Basswood Blvd, Fort Worth, TX 76137",
    latitude: 32.8601,
    longitude: -97.3647,
  },
  {
    slug: "tomball",
    name: "Lionheart Children's Academy – Tomball",
    label: "Tomball, TX",
    state: "Texas",
    city: "Tomball",
    fullAddress: "10700 FM 2920, Tomball, TX 77375",
    latitude: 30.0972,
    longitude: -95.6161,
  },
  {
    slug: "van-alstyne",
    name: "Lionheart Children's Academy – Van Alstyne",
    label: "Van Alstyne, TX",
    state: "Texas",
    city: "Van Alstyne",
    fullAddress: "201 S Waco St, Van Alstyne, TX 75495",
    latitude: 33.4215,
    longitude: -96.5772,
  },
  // Tennessee
  {
    slug: "murfreesboro",
    name: "Lionheart Children's Academy – Murfreesboro",
    label: "Murfreesboro, TN",
    state: "Tennessee",
    city: "Smyrna",
    fullAddress: "506 Legacy Dr, Smyrna, TN 37167",
    latitude: 35.9826,
    longitude: -86.5183,
  },
  {
    slug: "murfreesboro-mdo",
    name: "Lionheart Children's Academy – Murfreesboro (MDO Program)",
    label: "Murfreesboro, TN",
    state: "Tennessee",
    city: "Smyrna",
    fullAddress: "506 Legacy Dr, Smyrna, TN 37167",
    latitude: 35.9826,
    longitude: -86.5183,
  },
  // Ohio
  {
    slug: "harrison",
    name: "Lionheart Children's Academy – Harrison",
    label: "Harrison, OH",
    state: "Ohio",
    city: "Harrison",
    fullAddress: "11295 Harrison Ave, Harrison, OH 45030",
    latitude: 39.2620,
    longitude: -84.8197,
  },
  {
    slug: "sylvania",
    name: "Lionheart Children's Academy – Sylvania",
    label: "Sylvania, OH",
    state: "Ohio",
    city: "Sylvania",
    fullAddress: "7410 Erie St, Sylvania, OH 43560",
    latitude: 41.7189,
    longitude: -83.7122,
  },
];
