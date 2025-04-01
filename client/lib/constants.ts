export const EQUIPMENT_OPTIONS = [
  { id: "none", label: "No Equipment" },
  { id: "minimal", label: "Minimal (Dumbbells, Resistance Bands)" },
  { id: "home-gym", label: "Home Gym" },
  { id: "full-gym", label: "Full Gym Access" },
]

export const EXPERIENCE_OPTIONS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
]

export const DAYS_PER_WEEK_OPTIONS = [
  { value: 2, label: "2 days" },
  { value: 3, label: "3 days" },
  { value: 4, label: "4 days" },
  { value: 5, label: "5 days" },
  { value: 6, label: "6 days" },
]

// Focus options based on primary goal
export const FOCUS_OPTIONS = {
  "lose-weight": [
    { id: "body-fat", title: "Body Fat Reduction", description: "Focus on maximum calorie burn and fat loss" },
    { id: "toning", title: "Muscle Toning", description: "Lose weight while maintaining and defining muscle" },
    { id: "endurance", title: "Endurance", description: "Improve cardiovascular health while losing weight" },
    { id: "glutes", title: "Glutes", description: "Target glute development while losing overall body fat" },
  ],
  "get-stronger": [
    { id: "powerlifting", title: "Powerlifting", description: "Focus on squat, bench, deadlift strength" },
    {
      id: "functional",
      title: "Functional Strength",
      description: "Build practical, usable strength for everyday life",
    },
    { id: "upper-body", title: "Upper Body", description: "Emphasize chest, back, shoulders and arms strength" },
    { id: "lower-body", title: "Lower Body", description: "Focus on leg and posterior chain strength" },
  ],
  "get-athletic": [
    { id: "vertical-jump", title: "Vertical Jump", description: "Increase explosive power and jumping ability" },
    { id: "speed", title: "Speed", description: "Improve sprint performance and acceleration" },
    { id: "agility", title: "Agility", description: "Enhance coordination, balance and quick direction changes" },
    { id: "sport-specific", title: "Sport-Specific", description: "Tailor training to your specific sport's demands" },
  ],
  "build-muscle": [
    { id: "overall-size", title: "Overall Size", description: "Build balanced muscle mass throughout your body" },
    { id: "upper-body", title: "Upper Body", description: "Focus on chest, back, shoulders and arms development" },
    { id: "lower-body", title: "Lower Body", description: "Emphasize leg, glute and hip development" },
    {
      id: "specific-muscle",
      title: "Specific Muscle Group",
      description: "Target a particular muscle group for growth",
    },
  ],
}

