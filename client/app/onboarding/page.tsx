"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import {
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  DAYS_PER_WEEK_OPTIONS,
} from "../../lib/constants";

export default function OnboardingPage() {
  const router = useRouter();
  const [equipment, setEquipment] = useState<string>("none");
  const [experience, setExperience] = useState<string>("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [minutesPerWorkout, setMinutesPerWorkout] = useState<number>(45);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [userFocus, setUserFocus] = useState<string | null>(null);

  useEffect(() => {
    // Get user's goal and focus from localStorage
    const goal = localStorage.getItem("userGoal");
    const focus = localStorage.getItem("userFocus");

    if (!goal) {
      router.push("/goals");
      return;
    }

    setUserGoal(goal);
    setUserFocus(focus);
  }, [router]);

  const handleEquipmentChange = (value: string) => {
    setEquipment(value);
  };

  const handleExperienceChange = (value: string) => {
    setExperience(value);
  };

  const handleSubmit = async () => {
    try {
      // Save all preferences to localStorage
      localStorage.setItem("userEquipment", equipment);
      localStorage.setItem("userExperience", experience);
      localStorage.setItem("userDaysPerWeek", daysPerWeek.toString());
      localStorage.setItem(
        "userMinutesPerWorkout",
        minutesPerWorkout.toString()
      );

      // Generate the workout plan based on user preferences
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: userGoal,
          focus: userFocus,
          equipment,
          experience,
          daysPerWeek,
          minutesPerWorkout,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate workout plan");
      }

      const data = await response.json();

      console.log("🔥", data);

      // Save the workout plan to localStorage
      localStorage.setItem("workoutPlan", JSON.stringify(data.plan));
      localStorage.setItem("workoutPlanCreatedAt", new Date().toISOString());

      // Navigate to the dashboard
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate workout plan. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating workout plan:", error);
    }
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Customize Your Workout Plan</h1>
          <p className="text-muted-foreground">
            Answer a few questions so we can create your personalized plan.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
            <CardDescription>
              Select the equipment you have access to for your workouts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={equipment}
              onValueChange={handleEquipmentChange}
              className="flex flex-col space-y-2"
            >
              {EQUIPMENT_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.id}
                    id={`equipment-${option.id}`}
                  />
                  <Label htmlFor={`equipment-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Level</CardTitle>
            <CardDescription>
              Select your current fitness experience level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={experience}
              onValueChange={handleExperienceChange}
              className="flex flex-col space-y-2"
            >
              {EXPERIENCE_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.id}
                    id={`experience-${option.id}`}
                  />
                  <Label htmlFor={`experience-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workouts Per Week</CardTitle>
            <CardDescription>
              Select how many days per week you want to work out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                {DAYS_PER_WEEK_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      daysPerWeek === option.value ? "default" : "outline"
                    }
                    onClick={() => setDaysPerWeek(option.value)}
                    className={
                      daysPerWeek === option.value
                        ? "bg-primary hover:bg-primary-600"
                        : "hover:border-primary/50 hover:text-primary"
                    }
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout Duration</CardTitle>
            <CardDescription>
              Select how long you want each workout to be.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pt-1">
                <Slider
                  value={[minutesPerWorkout]}
                  min={20}
                  max={90}
                  step={5}
                  onValueChange={(value) => setMinutesPerWorkout(value[0])}
                  className="progress-gradient"
                />
              </div>
              <div className="text-center text-lg font-medium">
                {minutesPerWorkout} minutes
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-primary hover:bg-primary-600 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            Create My Plan{" "}
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse-slow" />
          </Button>
        </div>
      </div>
    </div>
  );
}
