"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { FOCUS_OPTIONS } from "../../lib/constants";

const GOALS = [
  {
    id: "lose-weight",
    title: "Lose Weight",
    description:
      "Burn fat and achieve a leaner physique with effective workouts.",
  },
  {
    id: "get-stronger",
    title: "Get Stronger",
    description:
      "Build strength and increase your power with progressive overload.",
  },
  {
    id: "get-athletic",
    title: "Get Athletic",
    description: "Improve overall fitness, speed, agility, and coordination.",
  },
  {
    id: "build-muscle",
    title: "Build Muscle",
    description:
      "Increase muscle mass and definition with hypertrophy-focused training.",
  },
];

export default function GoalsPage() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [focusArea, setFocusArea] = useState("");
  const [customFocus, setCustomFocus] = useState("");

  const availableFocusOptions = selectedGoal
    ? FOCUS_OPTIONS[selectedGoal] || []
    : [];

  const handleGoalSelect = (goalId: string, goal: typeof GOALS) => {
    console.log("GOAL ⚽️", goal);

    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      toast({
        title: "Please select a goal",
        description: "You need to select a fitness goal to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleFocusSelect = (focus: string) => {
    setFocusArea(focus);
    setCustomFocus("");
  };

  const handleSubmit = () => {
    if (!focusArea && !customFocus) {
      toast({
        title: "Please select or enter a focus area",
        description: "You need to specify what you want to focus on.",
        variant: "destructive",
      });
      return;
    }

    const finalFocus = focusArea === "custom" ? customFocus : focusArea;

    // Store the selected goal and focus in localStorage
    localStorage.setItem("userGoal", selectedGoal!);
    localStorage.setItem("userFocus", finalFocus);

    // Navigate to the onboarding page
    router.push("/onboarding");
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">What's your fitness goal?</h1>
          <p className="text-muted-foreground">
            Select your primary goal so we can create the perfect workout plan
            for you.
          </p>
        </div>

        {step === 1 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GOALS.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                    selectedGoal === goal.id
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : ""
                  }`}
                  onClick={() => handleGoalSelect(goal.id, goal)}
                >
                  <div
                    className={`absolute top-0 h-1 w-full ${
                      selectedGoal === goal.id ? "bg-primary" : "bg-transparent"
                    }`}
                  ></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {goal.title}
                      {selectedGoal === goal.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleContinue}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">
                What would you like to focus on?
              </h2>
              <p className="text-muted-foreground">
                Select a specific area to focus on while achieving your{" "}
                {GOALS.find((g) => g.id === selectedGoal)?.title.toLowerCase()}{" "}
                goal.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {availableFocusOptions.map((focus) => (
                <Card
                  key={focus.id}
                  className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                    focusArea === focus.id
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : ""
                  }`}
                  onClick={() => handleFocusSelect(focus.id)}
                >
                  <div
                    className={`absolute top-0 h-1 w-full ${
                      focusArea === focus.id ? "bg-accent" : "bg-transparent"
                    }`}
                  ></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {focus.title}
                      {focusArea === focus.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription>{focus.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}

              <Card
                className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                  focusArea === "custom"
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : ""
                }`}
                onClick={() => handleFocusSelect("custom")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Custom Focus
                    {focusArea === "custom" && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    Specify your own focus area not listed above.
                  </CardDescription>
                </CardHeader>
                {focusArea === "custom" && (
                  <CardContent>
                    <Textarea
                      placeholder="Describe what you want to focus on (e.g., vertical jump, core strength, etc.)"
                      value={customFocus}
                      onChange={(e) => setCustomFocus(e.target.value)}
                    />
                  </CardContent>
                )}
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
