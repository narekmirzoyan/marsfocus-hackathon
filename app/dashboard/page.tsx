"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Mission } from "@/types";
import { useUserStore } from "@/lib/store";
import BadgeDisplay from "@/components/BadgeDisplay";
import ProgressBar from "@/components/ProgressBar";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const missions = useUserStore((state) => state.missions);
  const getStats = useUserStore((state) => state.getStats);
  const [showBadges, setShowBadges] = useState(false);

  // Memoize stats to prevent infinite re-renders
  const stats = useMemo(() => getStats(), [user.totalXP, user.level, missions.length]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-mars-400 to-orange-500 bg-clip-text text-transparent">
              Mission Control
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBadges(!showBadges)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                {showBadges ? 'Hide' : 'Show'} Badges ({user.badges.length})
              </button>
              <Link
                href="/mission/new"
                className="px-6 py-3 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-semibold transition-colors"
              >
                + New Mission
              </Link>
            </div>
          </div>
          <p className="text-mars-300">Welcome back, {user.name}! 🚀</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl font-bold text-mars-400">{formatTime(stats.totalFocusTime)}</div>
            <div className="text-sm text-gray-400 mt-1">Total Focus Time</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl font-bold text-blue-400">{stats.totalMissions}</div>
            <div className="text-sm text-gray-400 mt-1">Missions Completed</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl font-bold text-yellow-400">Level {stats.currentLevel}</div>
            <div className="text-sm text-gray-400 mt-1">{stats.totalXP} XP</div>
            <div className="mt-2">
              <ProgressBar progress={stats.levelProgress} showPercentage={false} />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(stats.xpForNextLevel - (stats.totalXP % stats.xpForNextLevel))} XP to next level
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="text-3xl font-bold text-green-400">
              {stats.averageDistractions.toFixed(1)}
            </div>
            <div className="text-sm text-gray-400 mt-1">Avg. Distractions</div>
          </div>
        </div>

        {/* Badges Section */}
        {showBadges && (
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Badges</h2>
            <BadgeDisplay badges={user.badges} />
          </div>
        )}

        {/* Streak */}
        {stats.perfectFocusStreak > 0 && (
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-700/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🔥</span>
                <div>
                  <div className="text-2xl font-bold">
                    {stats.perfectFocusStreak} Mission Streak!
                  </div>
                  <div className="text-sm text-gray-400">
                    Zero distractions on your last {stats.perfectFocusStreak} mission{stats.perfectFocusStreak > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              {stats.longestStreak > 0 && (
                <div className="text-right">
                  <div className="text-lg font-bold text-mars-400">
                    Best: {stats.longestStreak}
                  </div>
                  <div className="text-xs text-gray-500">Longest streak</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Missions */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Missions</h2>

          {missions.filter(m => m.completed).length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-4">No missions completed yet</p>
              <Link
                href="/mission/new"
                className="inline-block px-6 py-3 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-semibold transition-colors"
              >
                Start Your First Mission 🚀
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {missions
                .filter(m => m.completed)
                .sort((a, b) => (b.endTime || 0) - (a.endTime || 0))
                .slice(0, 10)
                .map((mission) => (
                <div
                  key={mission.id}
                  className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{mission.topic}</h3>
                      {mission.description && (
                        <p className="text-sm text-gray-400 mb-2">{mission.description}</p>
                      )}
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>⏱️ {mission.duration} min</span>
                        <span>🚫 {mission.distractions.length} distractions</span>
                        <span>⭐ {mission.xpEarned} XP</span>
                        {mission.endTime && <span>📅 {formatDate(mission.endTime)}</span>}
                      </div>
                    </div>

                    {mission.distractions.length === 0 && (
                      <span className="text-2xl" title="Perfect Focus!">
                        ✨
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
