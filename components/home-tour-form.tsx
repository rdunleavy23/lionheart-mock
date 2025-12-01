"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeTourForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    childAge: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Tour form submitted:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", childAge: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Success Message */}
      {isSuccess && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">
              Thank you! We'll contact you soon to schedule your tour.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tour-name" className="text-base font-medium">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tour-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            required
            aria-label="Parent name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "tour-name-error" : undefined}
            className={cn(
              "h-11 text-base", // Minimum 44px height, 16px font
              errors.name && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.name && (
            <p id="tour-name-error" className="text-sm text-destructive flex items-center gap-1.5" role="alert">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tour-email" className="text-base font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tour-email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            required
            aria-label="Email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "tour-email-error" : undefined}
            className={cn(
              "h-11 text-base",
              errors.email && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.email && (
            <p id="tour-email-error" className="text-sm text-destructive flex items-center gap-1.5" role="alert">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tour-child-age" className="text-base font-medium">
          Child's Age <span className="text-muted-foreground text-sm font-normal">(optional)</span>
        </Label>
        <Input
          id="tour-child-age"
          name="childAge"
          type="text"
          placeholder="e.g., 3 years old"
          value={formData.childAge}
          onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
          aria-label="Child's age"
          className="h-11 text-base"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row pt-2">
        <Button 
          type="submit" 
          size="lg" 
          className="flex-1 font-semibold min-h-[48px]"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Tour
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1 font-semibold min-h-[48px]"
          onClick={() => {
            console.log("Request info clicked");
            alert("Thank you! We'll send you more information soon.");
          }}
        >
          Request Info
        </Button>
      </div>
    </form>
  );
}
