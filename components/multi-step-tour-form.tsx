"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  User,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Phone,
  Mail,
  Baby,
  Building,
} from "lucide-react";
import { locations } from "@/lib/locations-data";

// Form schema
const tourFormSchema = z.object({
  // Step 1: Location
  location: z.string().min(1, "Please select a location"),
  
  // Step 2: Parent Info
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  
  // Step 3: Child Info
  childName: z.string().optional(),
  childAge: z.string().min(1, "Please select your child's age"),
  startDate: z.string().optional(),
  
  // Step 4: Schedule
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type TourFormData = z.infer<typeof tourFormSchema>;

interface MultiStepTourFormProps {
  className?: string;
  onSuccess?: (data: TourFormData) => void;
  defaultLocation?: string;
}

const steps = [
  { id: 1, title: "Location", icon: MapPin },
  { id: 2, title: "Your Info", icon: User },
  { id: 3, title: "Child Info", icon: Baby },
  { id: 4, title: "Schedule", icon: Calendar },
];

const ageOptions = [
  { value: "infant", label: "Infant (6 weeks - 12 months)" },
  { value: "toddler", label: "Toddler (1-2 years)" },
  { value: "twos", label: "Two's (2-3 years)" },
  { value: "preschool", label: "Preschool (3-4 years)" },
  { value: "prek", label: "Pre-K (4-5 years)" },
  { value: "school-age", label: "School Age (5+ years)" },
];

const timeOptions = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
  { value: "evening", label: "Late Afternoon (3pm - 5pm)" },
];

export function MultiStepTourForm({
  className,
  onSuccess,
  defaultLocation,
}: MultiStepTourFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      location: defaultLocation || "",
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      startDate: "",
      preferredDate: "",
      preferredTime: "",
      additionalInfo: "",
    },
  });

  const selectedLocation = watch("location");

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger("location");
      case 2:
        return await trigger(["parentName", "email"]);
      case 3:
        return await trigger("childAge");
      case 4:
        return true;
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: TourFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Tour form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    onSuccess?.(data);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-xl bg-card p-8 text-center shadow-lg", className)}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground">Tour Scheduled!</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you! We'll contact you within 24 hours to confirm your tour.
        </p>
        <div className="mt-6 rounded-lg bg-muted/50 p-4 text-left">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Location:</strong>{" "}
            {locations.find((l) => l.slug === selectedLocation)?.name || selectedLocation}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <strong className="text-foreground">We'll email you at:</strong>{" "}
            {watch("email")}
          </p>
        </div>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(1);
          }}
          variant="outline"
          className="mt-6"
        >
          Schedule Another Tour
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={cn("rounded-xl bg-card p-6 shadow-lg md:p-8", className)}>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium hidden sm:block",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Choose a Location
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select the Lionheart center you'd like to visit
                </p>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {locations.map((location) => (
                  <label
                    key={location.slug}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:border-primary/50",
                      selectedLocation === location.slug
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border"
                    )}
                  >
                    <input
                      type="radio"
                      {...register("location")}
                      value={location.slug}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">
                          {location.name}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {location.fullAddress}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 2: Parent Info */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Your Information
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us a bit about yourself
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Your Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="parentName"
                      {...register("parentName")}
                      placeholder="Your full name"
                      className="pl-10"
                    />
                  </div>
                  {errors.parentName && (
                    <p className="text-sm text-destructive">
                      {errors.parentName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="(555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Child Info */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  About Your Child
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Help us prepare for your visit
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">Child's Name (Optional)</Label>
                  <Input
                    id="childName"
                    {...register("childName")}
                    placeholder="Your child's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childAge">Child's Age Group *</Label>
                  <Select
                    onValueChange={(value) => setValue("childAge", value)}
                    defaultValue={watch("childAge")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.childAge && (
                    <p className="text-sm text-destructive">
                      {errors.childAge.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Desired Start Date (Optional)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Schedule */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Schedule Your Tour
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick a time that works for you
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    {...register("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select
                    onValueChange={(value) => setValue("preferredTime", value)}
                    defaultValue={watch("preferredTime")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">
                    Anything else we should know? (Optional)
                  </Label>
                  <textarea
                    id="additionalInfo"
                    {...register("additionalInfo")}
                    placeholder="Special considerations, questions, etc."
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium text-foreground">Tour Summary</h4>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>Location:</strong>{" "}
                    {locations.find((l) => l.slug === selectedLocation)?.name}
                  </p>
                  <p>
                    <strong>Name:</strong> {watch("parentName")}
                  </p>
                  <p>
                    <strong>Child's Age:</strong>{" "}
                    {ageOptions.find((a) => a.value === watch("childAge"))?.label}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Tour
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

