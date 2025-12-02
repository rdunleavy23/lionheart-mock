"use client";

import { FAQSection, lionheartFAQs } from "@/components/faq-section";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  // Group FAQs by category for structured display
  const categories = ["Enrollment", "Tuition", "Daily Care", "Curriculum", "Safety"];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      {/* Header */}
      <AnimateOnScroll variant="fadeUp" className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          <HelpCircle className="mr-1 h-3 w-3" />
          Help Center
        </Badge>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
          Find answers to common questions about our programs, enrollment process, 
          and what to expect at Lionheart Children's Academy.
        </p>
      </AnimateOnScroll>

      {/* FAQ Section with all features */}
      <FAQSection
        faqs={lionheartFAQs}
        categories={categories}
        showSearch={true}
        showCategories={true}
        showFeedback={true}
        title=""
        subtitle=""
      />
    </main>
  );
}

