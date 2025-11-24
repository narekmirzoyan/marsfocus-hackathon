import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-mars-400 to-orange-500 bg-clip-text text-transparent">
          🚀 MarsFocus
        </h1>

        <p className="text-xl text-gray-300">
          Turn your study sessions into Mars colonization missions
        </p>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Stay focused, track distractions, earn XP, and unlock achievements.
          Every study session brings you closer to colonizing Mars.
        </p>

        <div className="flex gap-4 justify-center pt-8">
          <Link
            href="/mission/new"
            className="px-8 py-4 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-semibold transition-colors"
          >
            Start Mission
          </Link>

          <Link
            href="/dashboard"
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Focus Missions</h3>
            <p className="text-sm text-gray-400">Pomodoro-style timed sessions</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🚫</div>
            <h3 className="font-semibold mb-2">Distraction Tracking</h3>
            <p className="text-sm text-gray-400">Monitor tab switches</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🏅</div>
            <h3 className="font-semibold mb-2">Gamification</h3>
            <p className="text-sm text-gray-400">XP, levels, and badges</p>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold mb-2">AI Study Plans</h3>
            <p className="text-sm text-gray-400">Generated plans & quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
