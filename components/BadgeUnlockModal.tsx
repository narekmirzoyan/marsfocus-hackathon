'use client';

import { Badge } from '@/types';

interface BadgeUnlockModalProps {
  badges: Badge[];
  onClose: () => void;
}

export default function BadgeUnlockModal({ badges, onClose }: BadgeUnlockModalProps) {
  if (badges.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-mars-900 to-black border-2 border-mars-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-mars-400 mb-2">
            🎉 Badge{badges.length > 1 ? 's' : ''} Unlocked!
          </h2>
          <p className="text-mars-300">
            You have achieved new milestones on Mars!
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-mars-800/50 border border-mars-600 rounded-lg p-4 flex items-center gap-4"
            >
              <div className="text-4xl">{badge.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-mars-400">{badge.name}</h3>
                <p className="text-sm text-mars-300">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-mars-600 to-mars-700 text-white font-bold py-3 px-6 rounded-lg hover:from-mars-500 hover:to-mars-600 transition-all"
        >
          Continue Mission
        </button>
      </div>
    </div>
  );
}
