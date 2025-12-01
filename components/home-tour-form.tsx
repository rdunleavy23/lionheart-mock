"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export function HomeTourForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    childAge: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Tour form submitted:", formData);
    // Placeholder: In future version, this will submit to backend
    alert("Thank you! We'll contact you soon to schedule your tour.");
    setFormData({ name: "", email: "", childAge: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tour-name">Name</Label>
          <Input
            id="tour-name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            aria-label="Parent name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tour-email">Email</Label>
          <Input
            id="tour-email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            aria-label="Email address"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tour-child-age">Child's Age</Label>
        <Input
          id="tour-child-age"
          name="childAge"
          type="text"
          placeholder="e.g., 3 years old"
          value={formData.childAge}
          onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
          aria-label="Child's age"
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button type="submit" size="lg" className="flex-1 font-semibold">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Tour
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1 font-semibold"
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
