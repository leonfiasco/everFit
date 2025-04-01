"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Play,
  Square,
} from "lucide-react";
import { generateWorkoutPlan } from "@/client/lib/workout-generator";
import type { WorkoutPlan, WorkoutDay } from "@/client/lib/types";

export default function WorkoutPage({
  params,
}: {
  params: { week: string; day: string };
}) {
  const router = useRouter();
  const weekNum = Number.parseInt(params.week);
  const dayNum = Number.parseInt(params.day);

  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [workout, setWorkout] = useState<WorkoutDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(0);
  const [exerciseStates, setExerciseStates] = useState<
    { completed: boolean; weights: string[] }[]
  >([]);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch this from the backend
    const plan = generateWorkoutPlan({
      goal: "get-jacked",
      experience: "intermediate",
      daysPerWeek: 4,
      equipment: "full",
    });

    setWorkoutPlan(plan);

    if (
      plan &&
      plan.weeks[weekNum - 1] &&
      plan.weeks[weekNum - 1].workouts[dayNum - 1]
    ) {
      const currentWorkout = plan.weeks[weekNum - 1].workouts[dayNum - 1];
      setWorkout(currentWorkout);

      // Initialize exercise states
      setExerciseStates(
        currentWorkout.exercises.map((exercise) => ({
          completed: false,
          weights: Array(exercise.sets).fill(""),
        }))
      );
    }

    setLoading(false);
  }, [weekNum, dayNum]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleWeightChange = (
    exerciseIndex: number,
    setIndex: number,
    value: string
  ) => {
    setExerciseStates((prev) => {
      const newStates = [...prev];
      newStates[exerciseIndex].weights[setIndex] = value;
      return newStates;
    });
  };

  const toggleExerciseCompletion = (index: number) => {
    setExerciseStates((prev) => {
      const newStates = [...prev];
      newStates[index].completed = !newStates[index].completed;
      return newStates;
    });
  };

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handleStopTimer = () => {
    setTimerActive(false);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setTimerActive(false);
  };

  const handleFinishWorkout = () => {
    // In a real app, we would save the workout data to the backend
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Workout Not Found</CardTitle>
            <CardDescription>
              The requested workout could not be found.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold ml-4">
          Week {weekNum}, Day {dayNum}: {workout.name}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Exercises</CardTitle>
              <CardDescription>{workout.focus}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="active">Active Exercise</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <div className="space-y-4">
                    {workout.exercises.map((exercise, index) => (
                      <Card
                        key={index}
                        className={
                          exerciseStates[index]?.completed
                            ? "border-success bg-success-50/30 dark:bg-success-950/10"
                            : ""
                        }
                      >
                        {exerciseStates[index]?.completed && (
                          <div className="absolute top-0 h-1 w-full bg-success"></div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {exercise.name}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExerciseCompletion(index)}
                            >
                              {exerciseStates[index]?.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Square className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                          <CardDescription>
                            {exercise.sets} sets × {exercise.reps} reps •{" "}
                            {exercise.restTime}s rest
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-4 gap-2 mb-2 text-sm font-medium">
                            <div>Set</div>
                            <div>Reps</div>
                            <div>Weight (kg)</div>
                            <div>Previous</div>
                          </div>
                          {Array.from({ length: exercise.sets }).map(
                            (_, setIndex) => (
                              <div
                                key={setIndex}
                                className="grid grid-cols-4 gap-2 mb-2"
                              >
                                <div className="flex items-center">
                                  {setIndex + 1}
                                </div>
                                <div className="flex items-center">
                                  {exercise.reps}
                                </div>
                                <div>
                                  <Input
                                    type="number"
                                    value={
                                      exerciseStates[index]?.weights[
                                        setIndex
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      handleWeightChange(
                                        index,
                                        setIndex,
                                        e.target.value
                                      )
                                    }
                                    className="h-8"
                                    placeholder="0"
                                  />
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  {exercise.weight || "-"}
                                </div>
                              </div>
                            )
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="active">
                  {workout.exercises[activeExercise] && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">
                              {workout.exercises[activeExercise].name}
                            </CardTitle>
                            <CardDescription>
                              {workout.exercises[activeExercise].sets} sets ×{" "}
                              {workout.exercises[activeExercise].reps} reps
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                setActiveExercise((prev) =>
                                  Math.max(0, prev - 1)
                                )
                              }
                              disabled={activeExercise === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                setActiveExercise((prev) =>
                                  Math.min(
                                    workout.exercises.length - 1,
                                    prev + 1
                                  )
                                )
                              }
                              disabled={
                                activeExercise === workout.exercises.length - 1
                              }
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2 mb-2 text-sm font-medium">
                          <div>Set</div>
                          <div>Reps</div>
                          <div>Weight (kg)</div>
                          <div>Previous</div>
                        </div>
                        {Array.from({
                          length: workout.exercises[activeExercise].sets,
                        }).map((_, setIndex) => (
                          <div
                            key={setIndex}
                            className="grid grid-cols-4 gap-2 mb-2"
                          >
                            <div className="flex items-center">
                              {setIndex + 1}
                            </div>
                            <div className="flex items-center">
                              {workout.exercises[activeExercise].reps}
                            </div>
                            <div>
                              <Input
                                type="number"
                                value={
                                  exerciseStates[activeExercise]?.weights[
                                    setIndex
                                  ] || ""
                                }
                                onChange={(e) =>
                                  handleWeightChange(
                                    activeExercise,
                                    setIndex,
                                    e.target.value
                                  )
                                }
                                className="h-8"
                                placeholder="0"
                              />
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              {workout.exercises[activeExercise].weight || "-"}
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between mt-6">
                          <Button
                            variant="outline"
                            onClick={() =>
                              toggleExerciseCompletion(activeExercise)
                            }
                          >
                            {exerciseStates[activeExercise]?.completed ? (
                              <>Mark Incomplete</>
                            ) : (
                              <>Mark Complete</>
                            )}
                          </Button>
                          <Button
                            onClick={() =>
                              setActiveExercise((prev) =>
                                Math.min(workout.exercises.length - 1, prev + 1)
                              )
                            }
                            disabled={
                              activeExercise === workout.exercises.length - 1
                            }
                          >
                            Next Exercise
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleFinishWorkout}>
                Finish Workout
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mb-6 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-accent"></div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-accent" /> Workout Timer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="workout-timer mx-auto mb-4"
                style={
                  {
                    "--progress": `${(timer / 3600) * 100}%`,
                  } as React.CSSProperties
                }
              >
                <span className="workout-timer-text">{formatTime(timer)}</span>
              </div>
              <div className="flex justify-center gap-2">
                {!timerActive ? (
                  <Button onClick={handleStartTimer}>
                    <Play className="mr-2 h-4 w-4" /> Start
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleStopTimer}>
                    <Square className="mr-2 h-4 w-4" /> Pause
                  </Button>
                )}
                <Button variant="outline" onClick={handleResetTimer}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rest Timer</CardTitle>
              <CardDescription>Set timer for your rest periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="justify-between hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                >
                  30 seconds <Clock className="h-4 w-4 text-secondary" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                >
                  60 seconds <Clock className="h-4 w-4 text-secondary" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                >
                  90 seconds <Clock className="h-4 w-4 text-secondary" />
                </Button>
                <Button
                  variant="outline"
                  className="justify-between hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                >
                  120 seconds <Clock className="h-4 w-4 text-secondary" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
