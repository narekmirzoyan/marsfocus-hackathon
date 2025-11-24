# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MarsFocus** is a gamified focus and productivity web app for students, built for the HackMars hackathon (Productivity track). It turns study sessions into Mars colonization missions, combining:

- Focus sessions (Pomodoro-style "missions")
- Distraction tracking via tab visibility monitoring
- Gamification (XP, levels, badges)
- AI-generated study plans and micro-quizzes

### Problem Being Solved
Students struggle with distractions, lack of structure during self-study, and low motivation. MarsFocus makes focused work feel like a game where every study session helps you "colonize Mars."

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, (optional) shadcn/ui or Radix UI
- **Backend:** Next.js API Routes (serverless)
- **Database:** Supabase or Firebase Firestore
- **AI:** LLM provider (e.g., OpenAI API) via server-side routes
- **Deployment:** Vercel

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run type checking
npx tsc --noEmit
```

## Architecture Overview

### Core Data Models

- **Mission:** A focus session with topic, duration, tasks, start/end times, distraction count
- **User:** Profile with total XP, level, badges, total focus time
- **Badge:** Achievement unlocked based on milestones (e.g., "First Mission", "100 Focus Minutes")

### Key Routes/Pages

- `/` - Landing page
- `/mission/new` - Create new mission form (with optional AI generation)
- `/mission/[id]` - Active mission view with timer and distraction tracking
- `/dashboard` - User stats, mission history, badges

### Core Features Implementation

**Focus Mission Timer:**
- Uses browser timers and `visibilitychange` events
- Tracks when user switches tabs (distractions)
- Each distraction logged with timestamp

**Distraction Tracking:**
- Listen to `document.addEventListener('visibilitychange')` or window blur/focus events
- Store distraction events during mission
- Factor into XP calculation (more distractions = less XP)

**Gamification System:**
- XP formula: base XP per minute focused, reduced by distraction penalty
- Level progression based on total XP
- Badge unlock logic triggered after mission completion or milestones

**AI Study Plan Generation:**
- Server-side API route (e.g., `/api/ai/generate-plan`)
- Accepts topic and duration
- Returns structured study plan (3-5 tasks) and optional quiz questions
- User can edit before starting mission

## Important Conventions

### State Management
- Use React Context or Zustand for global state (user profile, XP, level)
- Local state for mission timer and distraction tracking

### API Routes
- Keep AI API keys server-side only (never expose in client)
- Use environment variables for sensitive credentials (Supabase, Firebase, OpenAI)

### Database Schema
- Store missions with user_id, start_time, end_time, duration, distractions array, xp_earned
- Store user progression (total_xp, level, badges array)

### TypeScript
- Define clear types for Mission, User, Badge, DistractionEvent
- Use strict mode

### Styling
- Use Tailwind utility classes
- Follow a consistent Mars/space theme (reds, oranges, dark backgrounds)
