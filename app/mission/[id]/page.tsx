"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import type { Mission, DistractionEvent, Badge } from "@/types";
import { calculateMissionXP } from "@/lib/xp";
import { useUserStore } from "@/lib/store";
import BadgeUnlockModal from "@/components/BadgeUnlockModal";
import QuizPanel from "@/components/QuizPanel";

export default function MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [mission, setMission] = useState<Mission | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distractions, setDistractions] = useState<DistractionEvent[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const lastVisibilityChange = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const addMission = useUserStore((state) => state.addMission);

  // Load mission from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`mission-${id}`);
    if (stored) {
      const loadedMission = JSON.parse(stored) as Mission;
      setMission(loadedMission);
      setTimeRemaining(loadedMission.duration * 60); // Convert to seconds
      setDistractions(loadedMission.distractions || []);
    } else {
      alert("Mission not found");
      router.push("/");
    }
  }, [id, router]);

  // Timer logic
  useEffect(() => {
    if (!isActive || isPaused || timeRemaining <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleMissionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, timeRemaining]);

  // Distraction tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isActive || isPaused) return;

      if (document.hidden) {
        // User switched away
        lastVisibilityChange.current = Date.now();
      } else {
        // User came back
        if (lastVisibilityChange.current > 0) {
          const duration = Date.now() - lastVisibilityChange.current;
          const newDistraction: DistractionEvent = {
            timestamp: lastVisibilityChange.current,
            duration,
          };

          setDistractions((prev) => [...prev, newDistraction]);
          lastVisibilityChange.current = 0;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (!mission) return;

    setIsActive(true);
    const updatedMission = {
      ...mission,
      startTime: Date.now(),
    };
    setMission(updatedMission);
    localStorage.setItem(`mission-${id}`, JSON.stringify(updatedMission));
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    if (confirm("Are you sure you want to stop this mission?")) {
      handleMissionComplete();
    }
  };

  const handleMissionComplete = () => {
    if (!mission) return;

    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const endTime = Date.now();
    const startTime = mission.startTime || endTime;

    // Calculate actual time spent in minutes
    const actualDuration = Math.round((endTime - startTime) / 60000);

    const completedMission: Mission = {
      ...mission,
      endTime,
      duration: actualDuration, // Update duration to actual time spent
      distractions,
      xpEarned: calculateMissionXP({
        ...mission,
        duration: actualDuration, // Use actual duration for XP calculation
        distractions
      }),
      completed: true,
      status: 'completed',
    };

    setMission(completedMission);

    // Save to Zustand store and get newly unlocked badges
    const newBadges = addMission(completedMission);

    // Also save to localStorage for backwards compatibility
    localStorage.setItem(`mission-${id}`, JSON.stringify(completedMission));
    const allMissions = JSON.parse(localStorage.getItem("missions") || "[]");
    allMissions.push(completedMission);
    localStorage.setItem("missions", JSON.stringify(allMissions));

    // Show badge modal if any badges were unlocked
    if (newBadges.length > 0) {
      setUnlockedBadges(newBadges);
      setShowBadgeModal(true);
    } else {
      setShowSummary(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!mission) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Badge unlock modal
  if (showBadgeModal) {
    return (
      <BadgeUnlockModal
        badges={unlockedBadges}
        onClose={() => {
          setShowBadgeModal(false);
          setShowSummary(true);
        }}
      />
    );
  }

  if (showSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-gray-800/50 rounded-lg border border-gray-700 p-8 space-y-6">
          <h1 className="text-4xl font-bold text-center">Mission Complete! 🎉</h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-mars-400">{mission.duration}</div>
              <div className="text-sm text-gray-400 mt-1">Minutes Focused</div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-400">{mission.xpEarned}</div>
              <div className="text-sm text-gray-400 mt-1">XP Earned</div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-400">{distractions.length}</div>
              <div className="text-sm text-gray-400 mt-1">Distractions</div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">
                {Math.round(((mission.duration * 60 - distractions.length * 5) / (mission.duration * 60)) * 100)}%
              </div>
              <div className="text-sm text-gray-400 mt-1">Focus Score</div>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <button
              onClick={() => router.push("/mission/new")}
              className="w-full px-6 py-3 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-semibold transition-colors"
            >
              Start Another Mission
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{mission.topic}</h1>
          {mission.description && (
            <p className="text-gray-400">{mission.description}</p>
          )}
        </div>

        {/* Timer */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-12 mb-8">
          <div className="text-center">
            <div className={`text-8xl font-bold mb-6 ${timeRemaining < 60 ? "text-red-400" : "text-mars-400"}`}>
              {formatTime(timeRemaining)}
            </div>

            <div className="flex gap-4 justify-center">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="px-8 py-4 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-bold text-lg transition-colors"
                >
                  Start Mission 🚀
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePause}
                    className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold transition-colors"
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={handleStop}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
                  >
                    Stop
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{distractions.length}</div>
            <div className="text-sm text-gray-400 mt-1">Distractions</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {calculateMissionXP({ ...mission, distractions })}
            </div>
            <div className="text-sm text-gray-400 mt-1">XP (Estimated)</div>
          </div>
        </div>

        {/* Tasks */}
        {mission.tasks && mission.tasks.length > 0 && (
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Study Tasks</h2>
            <ul className="space-y-2">
              {mission.tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-mars-400">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quiz Questions */}
        {mission.quizQuestions && mission.quizQuestions.length > 0 && (
          <QuizPanel questions={mission.quizQuestions} />
        )}
      </div>
    </div>
  );
}
