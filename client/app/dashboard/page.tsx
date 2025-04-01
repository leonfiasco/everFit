"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart, CalendarDays, Dumbbell, LineChart, Settings, Trophy } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { WorkoutCard } from "@/components/workout-card"

export default function DashboardPage() {
  const router = useRouter()
  const [workoutPlan, setWorkoutPlan] = useState<any | null>(null)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [userGoal, setUserGoal] = useState<string | null>(null)
  const [userFocus, setUserFocus] = useState<string | null>(null)
  const [planCreatedAt, setPlanCreatedAt] = useState<string | null>(null)

  useEffect(() => {
    // Check if the user has a workout plan
    const plan = localStorage.getItem("workoutPlan")
    const goal = localStorage.getItem("userGoal")
    const focus = localStorage.getItem("userFocus")
    const createdAt = localStorage.getItem("workoutPlanCreatedAt")

    if (!plan) {
      router.push("/goals")
      return
    }

    setWorkoutPlan(JSON.parse(plan))
    setUserGoal(goal)
    setUserFocus(focus)
    setPlanCreatedAt(createdAt)

    // Calculate current week based on plan creation date
    if (createdAt) {
      const weeksSinceCreation = Math.floor(
        (new Date().getTime() - new Date(createdAt).getTime()) / (7 * 24 * 60 * 60 * 1000),
      )
      setCurrentWeek(Math.min(Math.max(weeksSinceCreation + 1, 1), 12))
    }
  }, [router])

  // Format the user's goal for display
  const formatGoal = (goalId: string | null) => {
    if (!goalId) return ""

    return goalId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (!workoutPlan) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading your workout plan...</h1>
          <p className="text-muted-foreground">Please wait while we load your personalized plan.</p>
        </div>
      </div>
    )
  }

  const currentWorkouts = workoutPlan.weeks[currentWeek - 1]?.workouts || []
  const programProgress = Math.round((currentWeek / 12) * 100)

  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Your Fitness Dashboard</h1>
                <p className="text-muted-foreground">Track your progress and view your workout plan.</p>
              </div>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="card-hover-effect overflow-hidden border-primary/20 shadow">
              <div className="absolute inset-x-0 top-0 h-1.5 progress-gradient"></div>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
                <CardDescription>Your 12-week fitness journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Primary Goal: <span className="font-medium text-primary">{formatGoal(userGoal)}</span>
                    </span>
                    <span>{programProgress}% Complete</span>
                  </div>
                  {userFocus && (
                    <div className="text-sm">
                      Focus Area: <span className="font-medium text-accent">{userFocus}</span>
                    </div>
                  )}
                  <Progress value={programProgress} className="h-2 bg-muted progress-gradient" />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="stat-card rounded-lg border p-3 text-center">
                    <div className="text-sm font-medium text-muted-foreground">Current Week</div>
                    <div className="text-xl font-bold text-primary">
                      {currentWeek} <span className="text-sm text-muted-foreground">/ 12</span>
                    </div>
                  </div>
                  <div className="stat-card rounded-lg border p-3 text-center">
                    <div className="text-sm font-medium text-muted-foreground">Workouts</div>
                    <div className="text-xl font-bold text-primary">{workoutPlan.totalWorkouts}</div>
                  </div>
                  <div className="stat-card rounded-lg border p-3 text-center">
                    <div className="text-sm font-medium text-muted-foreground">Created</div>
                    <div className="text-sm font-medium">
                      {planCreatedAt ? formatDistanceToNow(new Date(planCreatedAt), { addSuffix: true }) : "Recently"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">This Week's Workouts</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(Math.max(currentWeek - 1, 1))}
                    disabled={currentWeek <= 1}
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(Math.min(currentWeek + 1, 12))}
                    disabled={currentWeek >= 12}
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {currentWorkouts.map((workout: any, index: number) => (
                  <WorkoutCard key={index} workout={workout} day={index + 1} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="card-hover-effect border-accent/20 shadow-sm">
            <CardHeader>
              <CardTitle>Progress Metrics</CardTitle>
              <CardDescription>Track your key measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="text-sm text-muted-foreground">Last 4 weeks</span>
                </div>
                <div className="h-[120px] w-full">
                  <div className="flex h-full items-end gap-2">
                    {[75, 74.2, 73.5, 72.8].map((weight, i) => (
                      <div key={i} className="relative flex w-full flex-col items-center">
                        <div className="absolute bottom-full mb-1 text-xs font-medium">{weight}kg</div>
                        <div
                          className="w-full rounded-sm bg-gradient-to-t from-accent to-primary shadow-inner"
                          style={{
                            height: `${(weight / 80) * 100}%`,
                          }}
                        />
                        <div className="mt-1 text-xs text-muted-foreground">W{i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-accent/20 text-accent hover:bg-accent/10">
                <LineChart className="mr-2 h-4 w-4" />
                Update Metrics
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover-effect border-secondary/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start hover:border-primary/50 hover:text-primary group"
                variant="outline"
              >
                <Dumbbell className="mr-2 h-4 w-4 text-primary group-hover:text-primary" />
                Log a Workout
              </Button>
              <Button className="w-full justify-start hover:border-accent/50 hover:text-accent group" variant="outline">
                <BarChart className="mr-2 h-4 w-4 text-accent group-hover:text-accent" />
                Record Body Measurements
              </Button>
              <Button
                className="w-full justify-start hover:border-secondary/50 hover:text-secondary group"
                variant="outline"
              >
                <CalendarDays className="mr-2 h-4 w-4 text-secondary group-hover:text-secondary" />
                Schedule Next Workout
              </Button>
              <Button
                className="w-full justify-start hover:border-success/50 hover:text-success group"
                variant="outline"
              >
                <Trophy className="mr-2 h-4 w-4 text-success group-hover:text-success" />
                Set New Goals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

