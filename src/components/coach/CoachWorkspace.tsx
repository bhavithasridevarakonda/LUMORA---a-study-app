import React, { useState } from 'react';
import { TechnicalSkill, CareerRoadmapStage, LearningTask } from '../../types';
import { DEMO_PROFILE, DEMO_SKILLS, DEMO_ROADMAP, DEMO_TASKS } from '../../data/demoData';
import {
  Briefcase,
  Target,
  Code,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface CoachWorkspaceProps {
  onOpenChat: (initialPrompt?: string, mode?: 'tutor' | 'coach') => void;
  tasks: typeof DEMO_TASKS;
  onToggleTask: (taskId: string) => void;
}

export const CoachWorkspace: React.FC<CoachWorkspaceProps> = ({
  onOpenChat,
  tasks,
  onToggleTask,
}) => {
  const [skills, setSkills] = useState<TechnicalSkill[]>(DEMO_SKILLS);
  const [roadmap, setRoadmap] = useState<CareerRoadmapStage[]>(DEMO_ROADMAP);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'roadmap' | 'skills' | 'interview_prep'>('roadmap');

  const careerTasks = tasks.filter((t) => t.relatedTo === 'coach');

  const categories = ['All', 'Core CS', 'Languages', 'Systems', 'Web & Cloud'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-8 pb-12">
      {/* Workspace Header with Crimson Red branding */}
      <div className="p-6 rounded-xl bg-[#242424]/80 border border-[#D64A45]/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#A31C1B]/20 border border-[#D64A45]/40 flex items-center justify-center text-[#D64A45]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-[#F4F0E8]">
                  AI CAREER COACH
                </h1>
                <span className="text-xs font-mono text-[#D64A45] bg-[#171717] px-2 py-0.5 rounded border border-[#D64A45]/30">
                  Career Workspace
                </span>
              </div>
              <p className="text-xs text-[#A7A7A0] mt-0.5">
                Strategic tech roadmap, LeetCode engineering practice, Flutter system architecture, and technical interview simulations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onOpenChat(
                  `Review my technical interview readiness for "${DEMO_PROFILE.targetRole}" and conduct a 15-minute coding round question.`,
                  'coach'
                )
              }
              className="px-4 py-2 text-xs font-semibold text-white bg-[#A31C1B] hover:bg-[#D64A45] rounded-lg transition-transform active:scale-95 shadow-sm whitespace-nowrap"
            >
              Ask Career Coach
            </button>
          </div>
        </div>

        {/* Target role metadata strip */}
        <div className="mt-6 pt-4 border-t border-[#343434] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A7A7A0]">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#D64A45]" />
            <span className="text-[#F4F0E8] font-semibold">Target Goal:</span>
            <span>{DEMO_PROFILE.targetRole}</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Current Stage: 2 of 3</span>
            <span aria-hidden="true">·</span>
            <span>142 Coding Problems Solved</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D64A45]">{DEMO_PROFILE.careerReadiness}% Target Readiness</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Career Readiness</span>
          <div className="text-2xl font-bold font-mono text-[#D64A45] mt-1 tabular-nums">
            {DEMO_PROFILE.careerReadiness}%
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            Based on skill mastery benchmarks
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Coding Problems</span>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] mt-1 tabular-nums">
            142 <span className="text-xs font-normal text-[#A7A7A0]">solved</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            85 Medium · 12 Hard · 45 Easy
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Average Assessment</span>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] mt-1 tabular-nums">
            78%
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            System design &amp; DSA rubrics
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Upcoming Priority</span>
          <div className="text-sm font-semibold text-[#F4F0E8] mt-1 truncate">
            Distributed Caching
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            High market demand skill
          </p>
        </div>
      </div>

      {/* Section View Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#242424] rounded-lg border border-[#343434] max-w-md">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'roadmap'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Career Roadmap
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'skills'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Technical Skills Matrix ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab('interview_prep')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'interview_prep'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Interview &amp; Tasks
        </button>
      </div>

      {/* View 1: Career Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0]">
            <p>Strategic milestones tailored to <span className="text-[#F4F0E8]">{DEMO_PROFILE.targetRole}</span>.</p>
            <span className="font-mono">Stage 2 of 3 active</span>
          </div>

          <div className="space-y-4">
            {roadmap.map((stage) => (
              <div
                key={stage.id}
                className={`p-6 rounded-xl border transition-colors ${
                  stage.status === 'in_progress'
                    ? 'bg-[#242424]/60 border-[#D64A45]/50'
                    : stage.status === 'completed'
                    ? 'bg-[#171717] border-[#343434] opacity-80'
                    : 'bg-[#171717]/50 border-[#343434]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold ${
                        stage.status === 'completed'
                          ? 'bg-[#4D956B]/20 text-[#4D956B] border border-[#4D956B]/40'
                          : stage.status === 'in_progress'
                          ? 'bg-[#A31C1B]/30 text-[#D64A45] border border-[#D64A45]/50'
                          : 'bg-[#242424] text-[#A7A7A0] border border-[#343434]'
                      }`}
                    >
                      0{stage.stageNumber}
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-sm text-[#F4F0E8]">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] text-[#A7A7A0]">
                        Duration: {stage.durationWeeks} Weeks · Focus: {stage.skillsFocused.join(', ')}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border self-start sm:self-auto ${
                      stage.status === 'completed'
                        ? 'bg-[#06110C] text-[#4D956B] border-[#4D956B]/30'
                        : stage.status === 'in_progress'
                        ? 'bg-[#242424] text-[#D64A45] border-[#D64A45]/40'
                        : 'bg-[#171717] text-[#A7A7A0] border-[#343434]'
                    }`}
                  >
                    {stage.status === 'completed'
                      ? 'Completed'
                      : stage.status === 'in_progress'
                      ? 'Active Sprint'
                      : 'Upcoming'}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#343434]/60">
                  <span className="text-[11px] font-semibold text-[#A7A7A0] uppercase tracking-wider">
                    Core Milestones:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {stage.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#F4F0E8] p-2 rounded bg-[#171717]/60 border border-[#343434]/40"
                      >
                        {stage.status === 'completed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4D956B] shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[#D64A45] shrink-0 mt-0.5" />
                        )}
                        <span className="leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Technical Skills Matrix */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#171717] text-[#F4F0E8] border border-[#D64A45]/40 shadow-sm'
                      : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenChat('Evaluate my technical skill gaps for senior backend and mobile engineering', 'coach')}
              className="text-xs text-[#D64A45] hover:text-[#F4F0E8] flex items-center gap-1 font-medium whitespace-nowrap"
            >
              <span>Request Diagnostic Skill Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-5 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#F4F0E8]">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] text-[#A7A7A0]">
                      Category: {skill.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-[#D64A45] tabular-nums">
                      {skill.currentProficiency}%
                    </span>
                    <span className="text-[10px] text-[#A7A7A0] block font-mono">
                      Target: {skill.targetProficiency}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden border border-[#343434]">
                  <div
                    className="h-full bg-[#D64A45] rounded-full transition-all duration-500"
                    style={{ width: `${skill.currentProficiency}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#343434]/40 text-center text-[11px] text-[#A7A7A0]">
                  <div>
                    <span className="block font-mono text-xs text-[#F4F0E8] tabular-nums">
                      {skill.completedLessons}
                    </span>
                    <span>Lessons</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-[#F4F0E8] tabular-nums">
                      {skill.practiceQuestionsSolved}
                    </span>
                    <span>Problems</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs text-[#D64A45] tabular-nums">
                      {skill.assessmentScore}%
                    </span>
                    <span>Assessment</span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#171717] rounded-lg border border-[#343434] space-y-1">
                  <span className="text-[10px] font-mono text-[#A7A7A0] uppercase tracking-wider block">
                    AI Recommended Action:
                  </span>
                  <p className="text-xs text-[#F4F0E8]">
                    {skill.nextRecommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Interview Prep & Tasks */}
      {activeTab === 'interview_prep' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                  Career Learning Tasks
                </h3>
                <p className="text-xs text-[#A7A7A0]">
                  Sprint tasks derived from active roadmap milestones
                </p>
              </div>
              <span className="text-xs font-mono text-[#D64A45]">
                {careerTasks.filter((t) => t.completed).length}/{careerTasks.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {careerTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-[#171717]/40 border-[#343434]/40 opacity-60'
                      : 'bg-[#171717] border-[#343434] hover:border-[#D64A45]/40'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-xs focus:outline-none">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#D64A45]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A7A7A0]" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-medium truncate ${task.completed ? 'line-through text-[#A7A7A0]' : 'text-[#F4F0E8]'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-[#A7A7A0] mt-0.5 line-clamp-1">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-[#A7A7A0]">
                      <span>{task.durationMinutes} mins</span>
                      <span aria-hidden="true">·</span>
                      <span>{task.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
            <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
              Technical Interview Simulation
            </h3>
            <p className="text-xs text-[#A7A7A0]">
              Practice live timed mock coding rounds evaluated on Code Cleanliness, Big-O Complexity, and Edge Case Handling.
            </p>

            <div className="p-4 bg-[#171717] rounded-lg border border-[#343434] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F4F0E8]">Mock Round: Graph Algorithms &amp; Caching</span>
                <span className="text-[10px] font-mono text-[#D64A45]">45 Mins</span>
              </div>
              <p className="text-[11px] text-[#A7A7A0] leading-relaxed">
                Problem: Design an in-memory LRU Cache with O(1) get and put operations, integrated with a Flutter client listener.
              </p>
              <button
                onClick={() =>
                  onOpenChat(
                    'Let\'s do a 45-minute mock technical interview: Design an LRU Cache with O(1) operations in Dart and Python.',
                    'coach'
                  )
                }
                className="w-full py-2 text-xs font-semibold text-white bg-[#A31C1B] hover:bg-[#D64A45] rounded-lg transition-colors text-center"
              >
                Launch Mock Technical Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
