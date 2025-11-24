import type { Badge, Mission, User } from "@/types";

// Define available badges
export const AVAILABLE_BADGES: Omit<Badge, 'unlockedAt'>[] = [
  {
    id: 'first-mission',
    name: 'First Steps',
    description: 'Complete your first mission',
    icon: '🚀',
    requirement: {
      type: 'first_mission',
      value: 1,
    },
  },
  {
    id: 'focus-master-25',
    name: 'Focus Apprentice',
    description: 'Accumulate 25 minutes of focus time',
    icon: '⏰',
    requirement: {
      type: 'focus_time',
      value: 25,
    },
  },
  {
    id: 'focus-master-100',
    name: 'Focus Master',
    description: 'Accumulate 100 minutes of focus time',
    icon: '🎯',
    requirement: {
      type: 'focus_time',
      value: 100,
    },
  },
  {
    id: 'focus-master-500',
    name: 'Focus Legend',
    description: 'Accumulate 500 minutes of focus time',
    icon: '👑',
    requirement: {
      type: 'focus_time',
      value: 500,
    },
  },
  {
    id: 'no-distractions',
    name: 'Laser Focused',
    description: 'Complete a mission with zero distractions',
    icon: '✨',
    requirement: {
      type: 'no_distractions',
      value: 1,
    },
  },
  {
    id: 'missions-10',
    name: 'Mission Specialist',
    description: 'Complete 10 missions',
    icon: '📋',
    requirement: {
      type: 'missions_completed',
      value: 10,
    },
  },
  {
    id: 'missions-50',
    name: 'Mission Commander',
    description: 'Complete 50 missions',
    icon: '🎖️',
    requirement: {
      type: 'missions_completed',
      value: 50,
    },
  },
  {
    id: 'perfect-streak-3',
    name: 'On Fire',
    description: 'Complete 3 missions in a row with no distractions',
    icon: '🔥',
    requirement: {
      type: 'perfect_streak',
      value: 3,
    },
  },
];

/**
 * Check if a badge should be unlocked based on user stats
 */
export function checkBadgeUnlock(
  badge: Omit<Badge, 'unlockedAt'>,
  user: User,
  recentMissions: Mission[]
): boolean {
  // Check if already unlocked
  if (user.badges.some(b => b.id === badge.id)) {
    return false;
  }

  const { type, value } = badge.requirement;

  switch (type) {
    case 'first_mission':
      return recentMissions.filter(m => m.completed).length >= 1;

    case 'focus_time':
      return user.totalFocusTime >= value;

    case 'missions_completed':
      return recentMissions.filter(m => m.completed).length >= value;

    case 'no_distractions':
      return recentMissions.some(m => m.completed && m.distractions.length === 0);

    case 'perfect_streak':
      // Check for consecutive missions with no distractions
      const sortedMissions = [...recentMissions]
        .filter(m => m.completed)
        .sort((a, b) => (b.endTime || 0) - (a.endTime || 0));

      let streak = 0;
      for (const mission of sortedMissions) {
        if (mission.distractions.length === 0) {
          streak++;
          if (streak >= value) return true;
        } else {
          streak = 0;
        }
      }
      return false;

    default:
      return false;
  }
}

/**
 * Get all newly unlocked badges for a user
 */
export function getNewlyUnlockedBadges(
  user: User,
  recentMissions: Mission[]
): Badge[] {
  const newBadges: Badge[] = [];

  for (const badge of AVAILABLE_BADGES) {
    if (checkBadgeUnlock(badge, user, recentMissions)) {
      newBadges.push({
        ...badge,
        unlockedAt: Date.now(),
      });
    }
  }

  return newBadges;
}
