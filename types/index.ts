// Core data types for MarsFocus

export interface DistractionEvent {
  timestamp: number;
  duration?: number; // how long the tab was out of focus (in ms)
}

export interface Mission {
  id: string;
  userId?: string;
  topic: string;
  description?: string;
  duration: number; // in minutes
  tasks?: string[];
  quizQuestions?: QuizQuestion[];
  startTime?: number;
  endTime?: number;
  distractions: DistractionEvent[];
  xpEarned?: number;
  completed: boolean;
  status?: 'pending' | 'active' | 'completed';
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  answer?: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  requirement: BadgeRequirement;
}

export interface BadgeRequirement {
  type: 'missions_completed' | 'focus_time' | 'no_distractions' | 'perfect_streak' | 'first_mission';
  value: number;
}

export interface User {
  id: string;
  email: string | null;
  name: string;
  totalXP: number;
  level: number;
  totalFocusTime: number; // in minutes
  badges: Badge[];
  createdAt: Date;
}

export interface UserStats {
  totalFocusTime: number;
  totalMissions: number;
  averageDistractions: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

// AI Generation types
export interface StudyPlanRequest {
  topic: string;
  duration: number;
}

export interface StudyPlanResponse {
  tasks: string[];
  quizQuestions: QuizQuestion[];
}

// Constants
export const XP_PER_MINUTE = 10;
export const DISTRACTION_PENALTY = 5;
export const XP_FOR_LEVEL = (level: number) => level * 100;
