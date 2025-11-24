'use client';

import { Badge } from '@/types';

interface BadgeDisplayProps {
  badges: Badge[];
}

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  if (badges.length === 0) {
    return (
      <div className="text-center py-8 text-mars-400">
        Complete missions to unlock badges!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="bg-mars-800/50 border border-mars-600 rounded-lg p-4 text-center hover:border-mars-500 transition-all"
        >
          <div className="text-4xl mb-2">{badge.icon}</div>
          <h4 className="text-sm font-bold text-mars-400 mb-1">{badge.name}</h4>
          <p className="text-xs text-mars-300">{badge.description}</p>
          <p className="text-xs text-mars-500 mt-2">
            {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : 'Recently unlocked'}
          </p>
        </div>
      ))}
    </div>
  );
}
