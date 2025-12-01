export type Program = {
  name: string;
  ageRange: string;
  description: string;
  href: string;
};

export const programs: Program[] = [
  {
    name: "Infants",
    ageRange: "6 weeks - 18 months",
    description: "Nurturing care where infants are immersed in daily experiences that encourage the development of gross and fine motor skills, as well as language development. Our curriculum includes activities designed to promote growth and the achievement of developmental milestones.",
    href: "/programs/infants",
  },
  {
    name: "Toddlers & Twos",
    ageRange: "18 - 36 months",
    description: "Environments abundant with opportunities to discover, explore, and experience the world. Our dedicated teaching team focuses on building children's self-esteem by celebrating daily successes and providing support through challenges. Includes Experience Early Learning Curriculum® and First Look Faith-Based Curriculum.",
    href: "/programs/toddlers",
  },
  {
    name: "Preschool & Pre-K",
    ageRange: "3 - 5 years",
    description: "Prepares children for kindergarten by building their skill sets and confidence. Through developmentally appropriate activities, children are encouraged to develop a lifelong love of learning. Focuses on social-emotional, physical, language, and cognitive development.",
    href: "/programs/preschool",
  },
  {
    name: "Trailblazers",
    ageRange: "K - 12 years",
    description: "Before and after-school care, plus school break programs. Activities include daily devotions, homework help, large and small group activities, community outreach projects, and playtime. School break programs feature STEAM activities, team building, field trips, and service projects.",
    href: "/programs/trailblazers",
  },
];
