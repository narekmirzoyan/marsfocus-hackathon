"use client";

import Link from "next/link";

export default function Home() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-mars-950 to-black">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-mars-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="particle absolute w-0.5 h-0.5 bg-white rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none"
           style={{
             background: 'radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)'
           }}
      />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Hero Title */}
          <div className="space-y-4 sm:space-y-6">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            >
              <span className="inline-block mr-2 sm:mr-4">🚀</span>
              <span className="bg-gradient-to-r from-mars-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
                MarsFocus
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-semibold px-4"
            >
              Transform Study into a <span className="text-mars-400">Mars Mission</span>
            </p>

            <p
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Gamified focus sessions with AI-powered study plans, real-time distraction tracking,
              and achievement unlocking. Every focused minute colonizes Mars.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-8 px-4">
            <Link
              href="/mission/new"
              className="group relative px-8 py-4 bg-gradient-to-r from-mars-600 to-orange-600 hover:from-mars-500 hover:to-orange-500 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-mars-500/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-2xl">🎯</span>
                Launch Mission
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/dashboard"
              className="group px-8 py-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 border-2 border-gray-700 hover:border-mars-500 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">📊</span>
                View Dashboard
              </span>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-12 sm:pt-20 px-4">
            {[
              {
                icon: "⏱️",
                title: "Focus Missions",
                desc: "Pomodoro-style sessions (15-60 min)",
                color: "from-blue-600/40 to-cyan-600/40",
                border: "border-blue-500/50"
              },
              {
                icon: "📊",
                title: "Distraction Tracking",
                desc: "Automatic tab-switch detection",
                color: "from-purple-600/40 to-pink-600/40",
                border: "border-purple-500/50"
              },
              {
                icon: "🎯",
                title: "XP & Levels",
                desc: "10 XP/min, badges & achievements",
                color: "from-orange-600/40 to-red-600/40",
                border: "border-orange-500/50"
              },
              {
                icon: "🤖",
                title: "AI Study Plans",
                desc: "Gemini-powered tasks & quizzes",
                color: "from-green-600/40 to-emerald-600/40",
                border: "border-green-500/50"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 bg-gradient-to-br ${feature.color} backdrop-blur-md rounded-2xl border-2 ${feature.border} hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="pt-12 sm:pt-20 px-4">
            <div className="bg-gradient-to-r from-mars-900/50 to-orange-900/50 backdrop-blur-sm rounded-2xl border border-mars-500/30 p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-transparent bg-gradient-to-r from-mars-400 to-orange-500 bg-clip-text">
                Why MarsFocus?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-mars-400">
                    100%
                  </div>
                  <div className="text-base sm:text-lg text-gray-300">
                    Free & Open Source
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-orange-400">
                    8
                  </div>
                  <div className="text-base sm:text-lg text-gray-300">
                    Unlockable Badges
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-red-400">
                    ∞
                  </div>
                  <div className="text-base sm:text-lg text-gray-300">
                    Productivity Boost
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-12 sm:pt-16 pb-8 px-4">
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Ready to colonize Mars through focused study?
            </p>
            <Link
              href="/mission/new"
              className="inline-flex items-center gap-2 text-mars-400 hover:text-mars-300 font-semibold transition-colors group"
            >
              Get Started Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
