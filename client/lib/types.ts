export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: string
  restTime: number
}

export interface WorkoutDay {
  name: string
  focus: string
  exercises: Exercise[]
}

export interface WorkoutWeek {
  weekNumber: number
  workouts: WorkoutDay[]
}

export interface WorkoutPlan {
  goal: string
  focus: string
  experience: string
  daysPerWeek: number
  equipment: string
  weeks: WorkoutWeek[]
}

export interface WorkoutGeneratorParams {
  goal: string
  focus: string
  experience: string
  daysPerWeek: number
  equipment: string
}

