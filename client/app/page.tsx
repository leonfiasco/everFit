import Link from "next/link"
import { ArrowRight, Dumbbell, LineChart, Target, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-background to-accent-50/50 z-0"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Your AI-Powered <span className="text-primary">Fitness Journey</span>
            </h1>
            <p className="mb-10 text-xl text-muted-foreground">
              Personalized workout plans that adapt to your goals, progress, and preferences. Powered by AI to maximize
              your results.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2 text-lg">
                <Link href="/goals">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent opacity-10 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Choose Our App?</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We combine AI technology with fitness expertise to deliver a personalized experience that helps you
              achieve your goals faster.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Personalized Goals</h3>
              <p className="text-muted-foreground">
                Set specific fitness goals with custom focus areas tailored to your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent ring-1 ring-accent/20">
                <Dumbbell className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">AI-Generated Workouts</h3>
              <p className="text-muted-foreground">
                Get custom 12-week workout plans created by AI based on your goals and preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-secondary/10 p-3 text-secondary ring-1 ring-secondary/20">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Track your workouts, measurements, and progress to stay motivated and on target.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-success/10 p-3 text-success ring-1 ring-success/20">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Adaptive Programs</h3>
              <p className="text-muted-foreground">
                Your workout plan evolves every 3 weeks to prevent plateaus and maximize results.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">For All Levels</h3>
              <p className="text-muted-foreground">
                Whether you're a beginner or advanced, our app adapts to your experience level.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card-hover-effect rounded-xl border bg-card p-6 shadow transition-all">
              <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent ring-1 ring-accent/20">
                <Dumbbell className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Equipment Flexible</h3>
              <p className="text-muted-foreground">
                Workouts adapt to the equipment you have, from bodyweight to full gym access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 z-0"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Transform Your Fitness?</h2>
            <p className="mb-8 text-lg text-primary-100">
              Join thousands of users who have achieved their fitness goals with our AI-powered workout plans.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2 text-lg">
              <Link href="/goals">
                Start Your Journey <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-xl font-bold text-primary">FitAI Planner</h2>
              <p className="text-sm text-muted-foreground">Your AI-powered fitness companion</p>
            </div>
            <div className="flex gap-8">
              <Link href="/goals" className="text-sm text-muted-foreground hover:text-foreground">
                Get Started
              </Link>
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FitAI Planner. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

