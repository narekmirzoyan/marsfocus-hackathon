import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Mission, User, Badge, XP_FOR_LEVEL } from '@/types';
import { calculateLevel, xpToNextLevel } from './xp';
import { getNewlyUnlockedBadges } from './badges';

interface UserStore {
  user: User;
  missions: Mission[];

  // Actions
  addMission: (mission: Mission) => Badge[];
  updateUser: (updates: Partial<User>) => void;
  getMissionById: (id: string) => Mission | undefined;
  getStats: () => {
    totalFocusTime: number;
    totalMissions: number;
    currentLevel: number;
    totalXP: number;
    xpForNextLevel: number;
    levelProgress: number;
    averageDistractions: number;
    perfectFocusStreak: number;
    longestStreak: number;
  };
  resetAllData: () => void;
}

const initialUser: User = {
  id: 'local-user',
  email: null,
  name: 'Mars Explorer',
  totalXP: 0,
  level: 1,
  badges: [],
  totalFocusTime: 0,
  createdAt: new Date(),
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: initialUser,
      missions: [],

      addMission: (mission: Mission) => {
        const currentState = get();
        const updatedMissions = [...currentState.missions, mission];

        // Calculate new user stats
        const totalXP = currentState.user.totalXP + (mission.xpEarned || 0);
        const totalFocusTime = currentState.user.totalFocusTime + mission.duration;
        const level = calculateLevel(totalXP);

        // Check for newly unlocked badges
        const newUser: User = {
          ...currentState.user,
          totalXP,
          totalFocusTime,
          level,
        };

        const newBadges = getNewlyUnlockedBadges(newUser, updatedMissions);

        // Update user with new badges
        const finalUser: User = {
          ...newUser,
          badges: [...currentState.user.badges, ...newBadges],
        };

        set({
          missions: updatedMissions,
          user: finalUser,
        });

        return newBadges;
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },

      getMissionById: (id: string) => {
        return get().missions.find(m => m.id === id);
      },

      getStats: () => {
        const { user, missions } = get();
        const completedMissions = missions.filter(m => m.status === 'completed');

        // Calculate average distractions
        const totalDistractions = completedMissions.reduce(
          (sum, m) => sum + m.distractions.length,
          0
        );
        const averageDistractions = completedMissions.length > 0
          ? totalDistractions / completedMissions.length
          : 0;

        // Calculate perfect focus streak (current)
        let perfectFocusStreak = 0;
        for (let i = completedMissions.length - 1; i >= 0; i--) {
          if (completedMissions[i].distractions.length === 0) {
            perfectFocusStreak++;
          } else {
            break;
          }
        }

        // Calculate longest streak
        let longestStreak = 0;
        let currentStreak = 0;
        for (const mission of completedMissions) {
          if (mission.distractions.length === 0) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }

        const xpForNextLevel = xpToNextLevel(user.totalXP);
        const currentLevelRequiredXP = user.level > 1
          ? Array.from({ length: user.level - 1 }, (_, i) => XP_FOR_LEVEL(i + 1)).reduce((sum, xp) => sum + xp, 0)
          : 0;
        const currentLevelXP = user.totalXP - currentLevelRequiredXP;
        const currentLevelMax = XP_FOR_LEVEL(user.level);
        const levelProgress = Math.min((currentLevelXP / currentLevelMax) * 100, 100);

        return {
          totalFocusTime: user.totalFocusTime,
          totalMissions: completedMissions.length,
          currentLevel: user.level,
          totalXP: user.totalXP,
          xpForNextLevel,
          levelProgress,
          averageDistractions: Math.round(averageDistractions * 10) / 10,
          perfectFocusStreak,
          longestStreak,
        };
      },

      resetAllData: () => {
        localStorage.removeItem('marsfocus-storage');
        set({
          user: initialUser,
          missions: [],
        });
      },
    }),
    {
      name: 'marsfocus-storage',
    }
  )
);
