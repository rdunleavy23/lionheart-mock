export type Program = {
  name: string;
  ageRange: string;
  description: string;
  href: string;
};

export const programs: Program[] = [
  {
    name: "Infant Care",
    ageRange: "6 weeks - 12 months",
    description: "Nurturing care in a safe, loving environment. Your baby will receive individual attention while building trust and security. Our infant program focuses on responsive care, sensory exploration, and creating secure attachments in a faith-infused environment.",
    href: "/programs/infants",
  },
  {
    name: "Toddlers",
    ageRange: "1-2 years",
    description: "Encouraging exploration and discovery through play-based learning. Building independence while feeling secure and loved. Your toddler will develop language, motor skills, and social connections in a warm, Christ-centered setting.",
    href: "/programs/toddlers",
  },
  {
    name: "Preschool",
    ageRange: "3-4 years",
    description: "Social-emotional development and school readiness skills through hands-on activities and biblical character lessons. Your preschooler will build confidence, friendships, and academic foundations while learning about kindness, empathy, and God's love.",
    href: "/programs/preschool",
  },
  {
    name: "Pre-K & Kindergarten Prep",
    ageRange: "4-5 years",
    description: "Preparing for kindergarten success with academic foundations, critical thinking, and a love for learning rooted in faith. Your child will develop literacy, math, and social skills while growing in character and confidence.",
    href: "/programs/pre-k",
  },
  {
    name: "After-school",
    ageRange: "School-age",
    description: "Safe, structured after-school environment with homework help, enrichment activities, and character development. Your school-age child will have a supportive place to grow, learn, and build friendships after the school day ends.",
    href: "/programs/after-school",
  },
];
