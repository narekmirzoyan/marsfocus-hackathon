# 🚀 MarsFocus - Gamified Focus & Productivity App

![Mars Theme](https://img.shields.io/badge/Theme-Mars-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)

**Turn your study sessions into Mars colonization missions! 🔴**

Built for **HackMars Hackathon** (Productivity Track) by [@narekmirzoyan](https://github.com/narekmirzoyan)

---

## 🎯 Problem & Solution

**Problem:** Students struggle with distractions, lack of structure, and low motivation during self-study.

**Solution:** MarsFocus gamifies study sessions into exciting Mars missions where every focused minute helps you colonize Mars!

---

## ✨ Features

### 🎮 Core Features
- ⏱️ **Focus Mission Timer** - Pomodoro-style sessions (15-60 min)
- 📊 **Real-Time Distraction Tracking** - Automatic tab-switch detection
- 🎯 **XP & Leveling System** - 10 XP/min, penalties for distractions
- 🏆 **8 Unlockable Badges** - Achievement system for milestones
- 🤖 **AI Study Plans** - Gemini-powered task generation
- 📝 **Interactive Quizzes** - Multiple-choice questions
- 📈 **Progress Dashboard** - Stats, history, and streaks
- 🔥 **Perfect Focus Streaks** - Zero-distraction mission chains

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **AI:** Google Gemini API
- **Database:** Supabase (optional)

---

## 🚀 Quick Start

```bash
# Clone repo
git clone https://github.com/narekmirzoyan/NM-HackMars-hachathon.git
cd NM-HackMars-hachathon

# Install dependencies
npm install

# Run dev server
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🎮 How to Use

1. **Create Mission** → Choose topic & duration
2. **Generate AI Plan** (optional) → Get smart study tasks
3. **Start Timer** → Focus on your work
4. **Earn XP** → Get rewarded for focus time
5. **Unlock Badges** → Achieve milestones
6. **Track Progress** → Review stats on dashboard

---

## 🏆 Badge System

| Badge | Requirement |
|-------|-------------|
| 🚀 First Steps | Complete 1 mission |
| ⏰ Focus Apprentice | 25 min focus time |
| 🎯 Focus Master | 100 min focus time |
| 👑 Focus Legend | 500 min focus time |
| ✨ Laser Focused | Zero distractions |
| 📋 Mission Specialist | 10 missions |
| 🎖️ Mission Commander | 50 missions |
| 🔥 On Fire | 3-mission streak |

---

## 📝 Environment Variables

Create `.env.local`:

```env
# Optional - works without it!
GEMINI_API_KEY=your_gemini_api_key

# Optional - uses localStorage by default
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

**App works perfectly without API keys!**

---

## 🎯 HackMars Hackathon

- **Track:** Productivity
- **Theme:** Mars Colonization
- **Goal:** Make studying fun and engaging

---

## 📄 License

MIT License

---

<div align="center">

**Made with ❤️ for HackMars Hackathon**

⭐ Star this repo if you like it!

[Report Bug](https://github.com/narekmirzoyan/NM-HackMars-hachathon/issues) • [Request Feature](https://github.com/narekmirzoyan/NM-HackMars-hachathon/issues)

</div>
