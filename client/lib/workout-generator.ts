// Simplified AI workout plan generator
export async function generateWorkoutPlan(preferences: {
  goal: string
  focus: string
  equipment: string
  experience: string
  daysPerWeek: number
  minutesPerWorkout: number
}) {
  const { goal, focus, equipment, experience, daysPerWeek, minutesPerWorkout } = preferences

  // This would normally call an AI model API
  // For now, we'll create a predefined plan

  // Create workout plan structure
  const weeks = []

  // Generate 12 weeks of workouts
  for (let week = 1; week <= 12; week++) {
    const workouts = []

    // Structure changes every 3 weeks for progression
    const phase = Math.ceil(week / 3)

    // Generate workouts for each day of the week
    for (let day = 1; day <= daysPerWeek; day++) {
      // Create a workout based on the goal, focus area, and current phase
      const workout = createWorkout({
        goal,
        focus,
        equipment,
        experience,
        minutesPerWorkout,
        phase,
        day,
      })

      workouts.push(workout)
    }

    weeks.push({
      week,
      phase,
      workouts,
    })
  }

  return {
    weeks,
    totalWorkouts: daysPerWeek * 12, // 12 weeks total
    preferences: {
      goal,
      focus,
      equipment,
      experience,
      daysPerWeek,
      minutesPerWorkout,
    },
  }
}

// Helper function to create workouts
function createWorkout({
  goal,
  focus,
  equipment,
  experience,
  minutesPerWorkout,
  phase,
  day,
}: {
  goal: string
  focus: string
  equipment: string
  experience: string
  minutesPerWorkout: number
  phase: number
  day: number
}) {
  // Basic workout templates based on goal
  const workout: any = {
    title: "",
    description: "",
    exerciseGroups: [],
  }

  // Common exercise intensity by experience level
  const intensityByLevel: any = {
    beginner: { sets: 2, repsMin: 8, repsMax: 12 },
    intermediate: { sets: 3, repsMin: 8, repsMax: 12 },
    advanced: { sets: 4, repsMin: 6, repsMax: 12 },
  }

  // Apply focus area to workout
  if (goal === "lose-weight") {
    // Weight loss focused workouts
    const dayTypes = [
      "Full Body HIIT",
      "Metabolic Conditioning",
      "Active Recovery",
      "Cardio + Core",
      "Circuit Training",
      "Strength and Cardio",
    ]
    workout.title = dayTypes[day % dayTypes.length]
    workout.description = `${phase === 1 ? "Foundation" : phase === 2 ? "Progression" : "Intensity"} phase ${focus ? `with ${focus} focus` : ""}`

    // Add focus-specific elements
    if (focus === "glutes") {
      workout.exerciseGroups = [
        {
          name: "Warm-up",
          exercises: [{ name: "Dynamic Stretching", sets: 1, reps: "5 mins" }],
        },
      ]

      // Add glute-focused exercises
      workout.exerciseGroups.push({
        name: "Glute Activation",
        exercises: [
          {
            name: "Glute Bridges",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          { name: "Lateral Band Walks", sets: intensityByLevel[experience].sets, reps: "12-15 each side" },
        ],
      })

      // Add primary workout with glute emphasis
      workout.exerciseGroups.push({
        name: "Main Workout",
        exercises: [
          {
            name: "Squats",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          {
            name: "Romanian Deadlifts",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          {
            name: "Hip Thrusts",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          { name: "Cardio Intervals", sets: 1, reps: "15 mins" },
        ],
      })
    } else {
      // Default weight loss workout structure
      workout.exerciseGroups = [
        {
          name: "Warm-up",
          exercises: [{ name: "Dynamic Stretching", sets: 1, reps: "5 mins" }],
        },
        {
          name: "Circuit",
          exercises: [
            { name: "Jumping Jacks", sets: 3, reps: "30 seconds" },
            {
              name: "Push-ups",
              sets: 3,
              reps: `${Math.max(5, intensityByLevel[experience].repsMin)}-${intensityByLevel[experience].repsMax}`,
            },
            {
              name: "Bodyweight Squats",
              sets: 3,
              reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
            },
            { name: "Mountain Climbers", sets: 3, reps: "30 seconds" },
          ],
        },
        {
          name: "Cardio",
          exercises: [{ name: "Interval Training", sets: 1, reps: "15 mins" }],
        },
      ]
    }
  } else if (goal === "get-stronger") {
    // Strength focused workouts
    const dayTypes = ["Push", "Pull", "Legs", "Upper Body", "Lower Body", "Full Body"]
    workout.title = dayTypes[day % dayTypes.length]
    workout.description = `${phase === 1 ? "Foundation" : phase === 2 ? "Progression" : "Peak"} phase ${focus ? `with ${focus} focus` : ""}`

    // Create strength workout with appropriate focus
    workout.exerciseGroups = [
      {
        name: "Warm-up",
        exercises: [{ name: "Dynamic Stretching", sets: 1, reps: "5 mins" }],
      },
    ]

    if (focus === "powerlifting") {
      workout.exerciseGroups.push({
        name: "Main Lifts",
        exercises:
          day % 3 === 0
            ? [{ name: "Squat", sets: intensityByLevel[experience].sets + 1, reps: "5" }]
            : day % 3 === 1
              ? [{ name: "Bench Press", sets: intensityByLevel[experience].sets + 1, reps: "5" }]
              : [{ name: "Deadlift", sets: intensityByLevel[experience].sets, reps: "5" }],
      })
    } else {
      // General strength workout
      workout.exerciseGroups.push({
        name: "Main Workout",
        exercises: [
          { name: "Compound Exercise 1", sets: intensityByLevel[experience].sets, reps: "6-8" },
          { name: "Compound Exercise 2", sets: intensityByLevel[experience].sets, reps: "8-10" },
          { name: "Accessory Exercise 1", sets: intensityByLevel[experience].sets, reps: "10-12" },
          { name: "Accessory Exercise 2", sets: intensityByLevel[experience].sets, reps: "10-12" },
        ],
      })
    }
  } else if (goal === "get-athletic") {
    // Athletic performance workouts
    const dayTypes = ["Power", "Agility", "Speed", "Conditioning", "Strength", "Active Recovery"]
    workout.title = dayTypes[day % dayTypes.length]
    workout.description = `${phase === 1 ? "Base" : phase === 2 ? "Build" : "Peak"} phase ${focus ? `with ${focus} focus` : ""}`

    workout.exerciseGroups = [
      {
        name: "Warm-up",
        exercises: [{ name: "Dynamic Stretching", sets: 1, reps: "8 mins" }],
      },
    ]

    // Add vertical jump specific training
    if (focus === "vertical-jump") {
      workout.exerciseGroups.push({
        name: "Plyometric Training",
        exercises: [
          { name: "Box Jumps", sets: intensityByLevel[experience].sets, reps: "6-8" },
          { name: "Depth Jumps", sets: intensityByLevel[experience].sets, reps: "6-8" },
          { name: "Squat Jumps", sets: intensityByLevel[experience].sets, reps: "8-10" },
        ],
      })

      workout.exerciseGroups.push({
        name: "Strength Training",
        exercises: [
          { name: "Squats", sets: intensityByLevel[experience].sets, reps: "6-8" },
          { name: "Calf Raises", sets: intensityByLevel[experience].sets, reps: "12-15" },
          { name: "Core Stabilization", sets: intensityByLevel[experience].sets, reps: "30-45 sec" },
        ],
      })
    } else {
      // General athletic workout
      workout.exerciseGroups.push({
        name: "Main Workout",
        exercises: [
          { name: "Agility Drill", sets: intensityByLevel[experience].sets, reps: "30 seconds" },
          { name: "Speed Drill", sets: intensityByLevel[experience].sets, reps: "30 seconds" },
          { name: "Strength Exercise", sets: intensityByLevel[experience].sets, reps: "8-10" },
          { name: "Conditioning Circuit", sets: 1, reps: "10 mins" },
        ],
      })
    }
  } else if (goal === "build-muscle") {
    // Muscle building workouts
    const dayTypes = ["Chest & Triceps", "Back & Biceps", "Legs & Shoulders", "Arms", "Full Body", "Push/Pull"]
    workout.title = dayTypes[day % dayTypes.length]
    workout.description = `${phase === 1 ? "Volume" : phase === 2 ? "Hypertrophy" : "Peak"} phase ${focus ? `with ${focus} focus` : ""}`

    workout.exerciseGroups = [
      {
        name: "Warm-up",
        exercises: [{ name: "Dynamic Stretching", sets: 1, reps: "5 mins" }],
      },
    ]

    // Apply focus to workout
    if (focus === "upper-body") {
      workout.exerciseGroups.push({
        name: "Upper Body Focus",
        exercises: [
          {
            name: "Bench Press",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          {
            name: "Rows",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          {
            name: "Shoulder Press",
            sets: intensityByLevel[experience].sets,
            reps: `${intensityByLevel[experience].repsMin}-${intensityByLevel[experience].repsMax}`,
          },
          { name: "Bicep Curls", sets: intensityByLevel[experience].sets, reps: `10-12` },
          { name: "Tricep Extensions", sets: intensityByLevel[experience].sets, reps: `10-12` },
        ],
      })
    } else {
      // Default muscle building structure
      workout.exerciseGroups.push({
        name: "Main Exercises",
        exercises: [
          { name: "Compound Exercise 1", sets: intensityByLevel[experience].sets, reps: "8-10" },
          { name: "Compound Exercise 2", sets: intensityByLevel[experience].sets, reps: "8-10" },
          { name: "Isolation Exercise 1", sets: intensityByLevel[experience].sets, reps: "10-12" },
          { name: "Isolation Exercise 2", sets: intensityByLevel[experience].sets, reps: "10-12" },
        ],
      })
    }
  }

  // Add cooldown to all workouts
  workout.exerciseGroups.push({
    name: "Cooldown",
    exercises: [{ name: "Static Stretching", sets: 1, reps: "5 mins" }],
  })

  return workout
}

