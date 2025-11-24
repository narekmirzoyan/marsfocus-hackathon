"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Mission, StudyPlanResponse } from "@/types";

export default function NewMissionPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(25);
  const [tasks, setTasks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateWithAI = async () => {
    if (!topic) {
      alert("Please enter a topic first");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, duration }),
      });

      if (response.ok) {
        const data: StudyPlanResponse = await response.json();
        setTasks(data.tasks);
      } else {
        alert("Failed to generate study plan. Please add tasks manually.");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      alert("Failed to generate study plan. Please add tasks manually.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTask = () => {
    setTasks([...tasks, ""]);
  };

  const handleUpdateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleStartMission = () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    // Create mission object
    const mission: Mission = {
      id: `mission-${Date.now()}`,
      topic,
      description,
      duration,
      tasks: tasks.filter(t => t.trim() !== ""),
      distractions: [],
      completed: false,
      createdAt: Date.now(),
    };

    // Store in localStorage for now (will use database later)
    localStorage.setItem(`mission-${mission.id}`, JSON.stringify(mission));

    // Navigate to mission page
    router.push(`/mission/${mission.id}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-mars-400 to-orange-500 bg-clip-text text-transparent">
          Create New Mission
        </h1>

        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-8 space-y-6">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Topic <span className="text-mars-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Linear Algebra, React Hooks, Spanish Vocabulary"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mars-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What do you want to accomplish in this mission?"
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mars-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Duration (minutes) <span className="text-mars-400">*</span>
            </label>
            <div className="flex gap-2">
              {[15, 25, 30, 45, 60].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    duration === min
                      ? "bg-mars-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>

          {/* AI Generation */}
          <div className="border-t border-gray-700 pt-6">
            <button
              onClick={handleGenerateWithAI}
              disabled={isGenerating || !topic}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              {isGenerating ? "Generating..." : "🤖 Generate Study Plan with AI"}
            </button>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">
                Tasks (Optional)
              </label>
              <button
                onClick={handleAddTask}
                className="text-sm text-mars-400 hover:text-mars-300"
              >
                + Add Task
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleUpdateTask(index, e.target.value)}
                    placeholder={`Task ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mars-500"
                  />
                  <button
                    onClick={() => handleRemoveTask(index)}
                    className="px-3 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Start Mission Button */}
          <div className="border-t border-gray-700 pt-6">
            <button
              onClick={handleStartMission}
              className="w-full px-8 py-4 bg-mars-600 hover:bg-mars-700 text-white rounded-lg font-bold text-lg transition-colors"
            >
              🚀 Start Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
