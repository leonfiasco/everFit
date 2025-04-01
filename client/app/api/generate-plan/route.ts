import { NextResponse } from "next/server";
import { generateWorkoutPlan } from "@/client/lib/workout-generator";

export async function POST(request: Request) {
  try {
    const {
      goal,
      focus,
      equipment,
      experience,
      daysPerWeek,
      minutesPerWorkout,
    } = await request.json();

    // Validate required fields
    if (
      !goal ||
      !equipment ||
      !experience ||
      !daysPerWeek ||
      !minutesPerWorkout
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate workout plan
    const plan = await generateWorkoutPlan({
      goal,
      focus,
      equipment,
      experience,
      daysPerWeek,
      minutesPerWorkout,
    });

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return NextResponse.json(
      { error: "Failed to generate workout plan" },
      { status: 500 }
    );
  }
}
