"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Exercise {
  name: string
  sets: number
  reps: string
}

interface ExerciseGroup {
  name: string
  exercises: Exercise[]
}

interface Workout {
  title: string
  description: string
  exerciseGroups: ExerciseGroup[]
}

interface WorkoutCardProps {
  workout: Workout
  day: number
}

export function WorkoutCard({ workout, day }: WorkoutCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [completed, setCompleted] = useState(false)

  const toggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCompleted(!completed)
  }

  return (
    <Card
      className={`enhanced-workout-card card-hover-effect ${completed ? "completed border-success/30 bg-success-50/30 dark:bg-success-950/10" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              Day {day}: {workout.title}
              {completed && <CheckCircle className="h-4 w-4 text-success" />}
            </CardTitle>
            <CardDescription>{workout.description}</CardDescription>
          </div>
          <Button
            variant={completed ? "outline" : "default"}
            size="sm"
            onClick={toggleCompleted}
            className={
              completed
                ? "border-success text-success hover:bg-success/10 hover:text-success"
                : "bg-primary hover:bg-primary-600"
            }
          >
            {completed ? "Completed" : "Complete"}
          </Button>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardFooter className="flex cursor-pointer items-center justify-center border-t p-2 text-sm text-muted-foreground hover:bg-muted/50">
            {isOpen ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Hide Workout
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> Show Workout
              </>
            )}
          </CardFooter>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {workout.exerciseGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="mb-2 font-medium">{group.name}</h4>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50 text-sm">
                        <tr>
                          <th className="p-2 text-left font-medium">Exercise</th>
                          <th className="p-2 text-center font-medium">Sets</th>
                          <th className="p-2 text-center font-medium">Reps</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {group.exercises.map((exercise, exerciseIndex) => (
                          <tr key={exerciseIndex}>
                            <td className="p-2">{exercise.name}</td>
                            <td className="p-2 text-center">{exercise.sets}</td>
                            <td className="p-2 text-center">{exercise.reps}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

