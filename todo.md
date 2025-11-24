# MarsFocus 🚀  
_Gamified focus missions for students, built for the HackMars Productivity track_

MarsFocus is a web app that turns study sessions into missions on Mars.  
It helps students remove distractions, work faster, and stay motivated by combining:

- 🎯 Focus sessions (Pomodoro-style “missions”)
- 🚫 Distraction tracking (tab switching)
- 🏅 XP, levels, and badges
- 🤖 AI-generated study plans and micro‑quizzes

---

## 🌌 Problem & Motivation

Students around the world struggle with:

- Constant distractions (social media, endless tabs, notifications)
- Lack of structure during self‑study
- Low motivation when studying alone

**MarsFocus** addresses this by making focused work feel like a game:  
every study session is a mission that helps you “colonize Mars” — stay focused, earn XP, and unlock achievements.

This project is built for the **Productivity** track of **HackMars**:  
> _“Create a program that can help students around the world remove distractions, work faster, or gamify studying.”_

---

## ✨ Core Features

- **Focus Missions**
  - Create time‑boxed study sessions (e.g., 25/50 minutes)
  - Attach a topic and goal to each mission
  - Pomodoro-like timer with start/pause/reset

- **Distraction Tracking**
  - Detects when the browser tab loses focus
  - Logs distraction events during a mission
  - Reduces XP or breaks a “perfect mission” streak

- **Gamification Layer**
  - Earn XP for each completed mission
  - XP is affected by distractions (more focus → more XP)
  - Levels & badges (e.g., *First Mission*, *No Distractions*, *100 Focus Minutes*)

- **AI‑Powered Study Plans**
  - Enter a topic and duration (e.g., “Linear Algebra – 25 minutes”)
  - AI generates:
    - A short study plan (3–5 steps)
    - A few quick questions/mini‑quiz items
  - User can edit the generated tasks before starting the mission

- **Dashboard & Stats**
  - Total focus time
  - Number of missions completed
  - Distraction stats
  - Unlocked badges

- **(Optional) Cloud Sync**
  - Sign in with Google/GitHub
  - Store missions, XP, and badges in a database

---

## 🧱 Tech Stack

**Frontend**

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- (Optional) [shadcn/ui](https://ui.shadcn.com/) or Radix UI for ready‑made components

**Backend**

- Next.js API Routes (serverless functions)
- Database options:
  - [Supabase](https://supabase.com/) **or**
  - [Firebase Firestore](https://firebase.google.com/)

**AI**

- Any LLM provider (e.g. OpenAI API) via a server-side API route

**Deployment**

- [Vercel](https://vercel.com/) (recommended for Next.js)

---

## 🧠 How It Works (High-Level)

1. **Create a mission**
   - User goes to `/mission/new`
   - Enters `topic`, `duration`, and an optional description/goal
   - (Optional) Clicks **“Generate with AI”** to fill tasks & questions

2. **Run the mission**
   - User is redirected to `/mission/[id]`
   - A big timer starts counting down
   - Tasks & optional questions are shown alongside the timer
   - The app listens for `visibilitychange` / tab blur events and logs distractions

3. **End of mission**
   - When the timer ends (or mission is stopped), MarsFocus:
     - Calculates XP based on duration and number of distractions
     - Updates the user’s level and possibly unlocks badges
   - Shows a summary screen: focus time, distractions, XP gained

4. **Dashboard**
   - `/dashboard` aggregates all missions:
     - Total minutes focused
     - Average distractions per mission
     - XP and level
     - Recently unlocked badges

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm, yarn, or pnpm
- (Optional) Accounts for:
  - Supabase or Firebase (if you want cloud storage)
  - An AI provider (e.g., OpenAI API key)