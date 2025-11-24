import { XP_PER_MINUTE, DISTRACTION_PENALTY, XP_FOR_LEVEL } from "@/types";
import type { Mission } from "@/types";

/**
 * Calculate XP earned for a mission
 * Formula: (duration in minutes * XP_PER_MINUTE) - (distractions * DISTRACTION_PENALTY)
 */
export function calculateMissionXP(mission: Mission): number {
  const baseXP = mission.duration * XP_PER_MINUTE;
  const penalty = mission.distractions.length * DISTRACTION_PENALTY;
  return Math.max(0, baseXP - penalty);
}

/**
 * Calculate user level from total XP
 */
export function calculateLevel(totalXP: number): number {
  let level = 1;
  let xpRequired = XP_FOR_LEVEL(level);

  while (totalXP >= xpRequired) {
    level++;
    xpRequired += XP_FOR_LEVEL(level);
  }

  return level;
}

/**
 * Calculate XP needed for next level
 */
export function xpToNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  let xpRequired = 0;

  for (let i = 1; i <= currentLevel; i++) {
    xpRequired += XP_FOR_LEVEL(i);
  }

  return xpRequired - totalXP;
}

/**
 * Calculate XP progress percentage for current level
 */
export function calculateLevelProgress(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  const xpForCurrentLevel = XP_FOR_LEVEL(currentLevel);
  const xpNeeded = xpToNextLevel(totalXP);

  return ((xpForCurrentLevel - xpNeeded) / xpForCurrentLevel) * 100;
}
