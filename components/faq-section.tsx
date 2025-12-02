"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  categories?: string[];
  className?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  showFeedback?: boolean;
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  faqs,
  categories,
  className,
  showSearch = true,
  showCategories = true,
  showFeedback = true,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our programs and enrollment",
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [feedback, setFeedback] = React.useState<Record<string, "helpful" | "not-helpful" | null>>({});

  // Extract unique categories from FAQs if not provided
  const allCategories = React.useMemo(() => {
    if (categories) return ["all", ...categories];
    const uniqueCats = new Set(faqs.map((faq) => faq.category));
    return ["all", ...Array.from(uniqueCats)];
  }, [faqs, categories]);

  // Filter FAQs based on search and category
  const filteredFaqs = React.useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [faqs, activeCategory, searchQuery]);

  // Group FAQs by category for display
  const groupedFaqs = React.useMemo(() => {
    if (activeCategory !== "all") {
      return { [activeCategory]: filteredFaqs };
    }

    const grouped: Record<string, FAQItem[]> = {};
    filteredFaqs.forEach((faq) => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFaqs, activeCategory]);

  const handleFeedback = (faqId: string, type: "helpful" | "not-helpful") => {
    setFeedback((prev) => ({
      ...prev,
      [faqId]: prev[faqId] === type ? null : type,
    }));
  };

  return (
    <div className={cn("", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </motion.div>

      {/* Search */}
      {showSearch && (
        <div className="mb-6 mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      {showCategories && allCategories.length > 2 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Questions" : category}
            </Button>
          ))}
        </div>
      )}

      {/* FAQ List */}
      {Object.keys(groupedFaqs).length === 0 ? (
        <div className="py-12 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No questions found</p>
          {searchQuery && (
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {activeCategory === "all" && (
                <h3 className="mb-4 text-lg font-semibold text-foreground capitalize flex items-center gap-2">
                  <Badge variant="secondary">{category}</Badge>
                </h3>
              )}
              <Accordion type="single" collapsible className="space-y-3">
                {categoryFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem
                      value={faq.id}
                      className="rounded-lg border bg-card px-4 shadow-sm"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="pr-4 font-medium text-foreground">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>

                        {/* Feedback */}
                        {showFeedback && (
                          <div className="mt-4 flex items-center gap-4 pt-4 border-t">
                            <span className="text-sm text-muted-foreground">
                              Was this helpful?
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant={feedback[faq.id] === "helpful" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFeedback(faq.id, "helpful")}
                                className="h-8"
                              >
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                Yes
                              </Button>
                              <Button
                                variant={feedback[faq.id] === "not-helpful" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleFeedback(faq.id, "not-helpful")}
                                className="h-8"
                              >
                                <ThumbsDown className="mr-1 h-3 w-3" />
                                No
                              </Button>
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 rounded-xl bg-muted/50 p-8 text-center"
      >
        <MessageCircle className="mx-auto h-10 w-10 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-foreground">
          Still have questions?
        </h3>
        <p className="mt-2 text-muted-foreground">
          We're here to help. Reach out to us and we'll get back to you as soon as possible.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button>
            Contact Us
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Schedule a Tour
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// Pre-configured FAQ data
export const lionheartFAQs: FAQItem[] = [
  // Enrollment & Registration
  {
    id: "enrollment-1",
    category: "Enrollment",
    question: "What is the enrollment process?",
    answer: "Our enrollment process is simple: First, schedule a tour to visit our center and meet our staff. Next, complete an enrollment application and submit required documents. Finally, we'll confirm your child's spot and schedule their first day. The entire process typically takes 1-2 weeks.",
  },
  {
    id: "enrollment-2",
    category: "Enrollment",
    question: "Is there a waitlist?",
    answer: "Depending on the program and location, there may be a waitlist. We encourage families to apply early, especially for infant programs which have limited spots. You can check real-time availability on our website or contact your preferred location directly.",
  },
  {
    id: "enrollment-3",
    category: "Enrollment",
    question: "What documents are required for enrollment?",
    answer: "Required documents include: proof of child's age (birth certificate), immunization records, emergency contact information, authorized pickup list, and any relevant medical or allergy information. Some locations may require additional state-specific forms.",
  },

  // Tuition & Payments
  {
    id: "tuition-1",
    category: "Tuition",
    question: "What are your tuition rates?",
    answer: "Tuition varies by location and program. Factors include your child's age, schedule (full-time vs. part-time), and specific location. We encourage you to contact your preferred center directly for accurate pricing. We also accept various forms of childcare assistance.",
  },
  {
    id: "tuition-2",
    category: "Tuition",
    question: "Do you accept childcare assistance or subsidies?",
    answer: "Yes! We accept various forms of childcare assistance including state subsidy programs, employer-sponsored childcare benefits, and flexible spending accounts (FSA/Dependent Care). Contact your local center for specific programs accepted in your area.",
  },
  {
    id: "tuition-3",
    category: "Tuition",
    question: "What is your payment policy?",
    answer: "Tuition is due weekly in advance. We offer automatic payment options for convenience. A registration fee is required upon enrollment. Please review your enrollment agreement for complete payment policies including late payment fees and vacation/sick day policies.",
  },

  // Daily Operations
  {
    id: "daily-1",
    category: "Daily Care",
    question: "What are your hours of operation?",
    answer: "Most Lionheart centers are open Monday through Friday, 6:30 AM to 6:30 PM. Hours may vary by location. We're closed on major holidays. Please check with your specific center for exact hours and holiday closures.",
  },
  {
    id: "daily-2",
    category: "Daily Care",
    question: "What should my child bring each day?",
    answer: "For infants: diapers, wipes, bottles, formula/breast milk, and extra clothes. For toddlers and older: a change of clothes, any comfort items, and sunscreen. We provide all meals, snacks, and bedding for naptime. All items should be labeled with your child's name.",
  },
  {
    id: "daily-3",
    category: "Daily Care",
    question: "What is your sick child policy?",
    answer: "Children should stay home if they have a fever over 100°F, vomiting, diarrhea, or contagious conditions. Children must be symptom-free for 24 hours before returning. If your child becomes ill at school, we'll contact you for pickup within one hour.",
  },

  // Curriculum & Faith
  {
    id: "curriculum-1",
    category: "Curriculum",
    question: "What curriculum do you use?",
    answer: "We use a research-based early learning curriculum that focuses on school readiness in all developmental areas: cognitive, social-emotional, physical, and language development. Our curriculum integrates biblical values naturally throughout daily activities.",
  },
  {
    id: "curriculum-2",
    category: "Curriculum",
    question: "How do you integrate faith into your program?",
    answer: "Faith is woven naturally throughout our day through age-appropriate Bible stories, simple prayers, worship songs, and character development. We teach values like kindness, respect, and compassion. We welcome families of all faith backgrounds.",
  },
  {
    id: "curriculum-3",
    category: "Curriculum",
    question: "How do you prepare children for kindergarten?",
    answer: "Our Pre-K program focuses on kindergarten readiness including early literacy (letter recognition, phonics, writing), math concepts (counting, patterns, shapes), social skills (following directions, self-regulation), and independence skills.",
  },

  // Safety & Security
  {
    id: "safety-1",
    category: "Safety",
    question: "What safety measures are in place?",
    answer: "Every center has secure entry systems requiring authorization for access. All staff undergo thorough background checks and ongoing training. We maintain strict supervision ratios, have emergency procedures in place, and conduct regular safety drills.",
  },
  {
    id: "safety-2",
    category: "Safety",
    question: "What is your staff-to-child ratio?",
    answer: "We meet or exceed state-mandated ratios: Infants 1:4, Toddlers 1:5, Two's 1:7, Preschool 1:10, Pre-K 1:12. These ratios ensure individualized attention and quality care for every child.",
  },
  {
    id: "safety-3",
    category: "Safety",
    question: "Are your centers licensed and accredited?",
    answer: "Yes, all Lionheart centers are fully licensed by state regulatory agencies and maintain all required certifications. We're committed to exceeding licensing standards in all areas of care and education.",
  },
];

// Compact FAQ for location pages
interface CompactFAQProps {
  faqs: FAQItem[];
  maxItems?: number;
  className?: string;
}

export function CompactFAQ({ faqs, maxItems = 5, className }: CompactFAQProps) {
  const displayFaqs = faqs.slice(0, maxItems);

  return (
    <div className={cn("", className)}>
      <Accordion type="single" collapsible className="space-y-2">
        {displayFaqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border-b"
          >
            <AccordionTrigger className="text-left hover:no-underline py-3 text-sm">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-3">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {faqs.length > maxItems && (
        <Button variant="link" className="mt-4 p-0">
          View all {faqs.length} questions
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

