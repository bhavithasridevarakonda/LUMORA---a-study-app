import React from 'react';
import { NavigationTab, StudentProfile } from '../../types';
import {
  DEMO_SUBJECTS,
  DEMO_TASKS,
  DEMO_SKILLS,
  DEMO_ROADMAP,
  DEMO_AI_RECOMMENDATIONS,
} from '../../data/demoData';
import {
  BookOpen,
  Briefcase,
  Flame,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Brain,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  Target,
  GraduationCap,
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenChat: (initialPrompt?: string, mode?: 'tutor' | 'coach') => void;
  tasks: typeof DEMO_TASKS;
  onToggleTask: (taskId: string) => void;
  profile: StudentProfile;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onOpenChat,
  tasks,
  onToggleTask,
  profile,
}) => {
  const currentOS = DEMO_SUBJECTS[0];
  const pendingTasks = tasks.filter((t) => !t.completed);
  const activeRoadmapStage = DEMO_ROADMAP[1]; // Stage 2 in progress

  return (
    <div className="space-y-8 pb-12">
      {/* Demonstration notice banner */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#242424]/40 border border-[#343434] text-xs text-[#A7A7A0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4D956B]"></span>
          <span className="font-semibold text-[#F4F0E8]">Phase 1 &amp; 2 Active:</span>
          <span>Official brand tokens &amp; high-fidelity workspace initialized. Demonstrating complete student ecosystem with realistic records.</span>
        </div>
        <span className="font-mono text-[11px] text-[#A7A7A0] hidden md:inline">
          RLS &amp; pgvector ready
        </span>
      </div>

      {/* Hero Header with Cinematic University Hall Asset */}
      <div className="relative rounded-xl overflow-hidden border border-[#343434] bg-[#242424]">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/academic_library_cinematic_1794236211767.jpg"
            alt="University Academic Study Hall"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/80 to-transparent" />
        </div>

        <div className="relative p-6 lg:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#A7A7A0]">
              <span>{profile.university}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.degree}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{profile.academicYear}</span>
            </div>
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-[#F4F0E8] tracking-tight text-balance">
              Welcome back, {profile.name.split(' ')[0] || profile.name}.
            </h1>
            <p className="text-sm text-[#A7A7A0] leading-relaxed">
              Your exam revision for <span className="text-[#F4F0E8] font-medium">{currentOS.name}</span> is 82% complete. 
              The next university exam is in <span className="text-[#4D956B] font-mono font-medium">15 days</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenChat('What should I study next to prepare for Operating Systems and my tech interviews?')}
              className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#F4F0E8] hover:bg-white rounded-lg transition-transform active:scale-95 shadow-sm whitespace-nowrap"
            >
              Ask AI Study Mate
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip - Tabular Numerals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#242424]/50 border border-[#343434]">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0] mb-2">
            <span>Overall Progress</span>
            <span className="font-mono text-[10px] text-[#4D956B]">Weighted</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] tabular-nums">
            {profile.overallProgress}%
          </div>
          <div className="w-full bg-[#343434] h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-[#4D956B] rounded-full transition-all duration-500"
              style={{ width: `${profile.overallProgress}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/50 border border-[#343434]">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0] mb-2">
            <span>Study Hours Logged</span>
            <Clock className="w-3.5 h-3.5 text-[#A7A7A0]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] tabular-nums">
            {profile.totalStudyHours} <span className="text-sm font-normal text-[#A7A7A0]">hrs</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-3">
            +29.9 hrs this week
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/50 border border-[#343434]">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0] mb-2">
            <span>Learning Streak</span>
            <Flame className="w-3.5 h-3.5 text-[#D64A45]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#D64A45] tabular-nums">
            {profile.streakDays} <span className="text-sm font-normal text-[#A7A7A0]">days</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-3">
            Personal best record
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/50 border border-[#343434]">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0] mb-2">
            <span>Persistent Memories</span>
            <Brain className="w-3.5 h-3.5 text-[#4D956B]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] tabular-nums">
            5 <span className="text-sm font-normal text-[#A7A7A0]">active</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-3">
            Cross-chat memory sync on
          </p>
        </div>
      </div>

      {/* Dual Intelligent Systems Portals: TUTOR & COACH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: AI EXAM TUTOR Portal */}
        <div className="p-6 rounded-xl bg-[#06110C] border border-[#4D956B]/30 flex flex-col justify-between group hover:border-[#4D956B]/60 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#4D956B]/15 border border-[#4D956B]/30 flex items-center justify-center text-[#4D956B]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#F4F0E8]">
                    AI EXAM TUTOR
                  </h3>
                  <div className="text-xs text-[#4D956B]">
                    Academic Workspace
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs text-[#F4F0E8] bg-[#242424] px-2 py-1 rounded border border-[#343434]">
                {profile.academicPreparedness}% Prepared
              </span>
            </div>

            <p className="text-xs text-[#A7A7A0] leading-relaxed">
              Curriculum-aligned examination prep powered by your uploaded textbooks, lecture notes and 5-year university PYQs.
            </p>

            <div className="p-3 bg-[#171717] rounded-lg border border-[#343434] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F4F0E8] font-medium">{currentOS.name} ({currentOS.code})</span>
                <span className="font-mono text-[11px] text-[#A7A7A0]">Exam: {currentOS.examDate}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#A7A7A0]">
                <span>Unit 3: Demand Paging &amp; TLB Hit Ratios</span>
                <span className="text-[#4D956B] font-mono">3 difficult topics flagged</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#343434] flex items-center justify-between">
            <div className="text-xs text-[#A7A7A0]">
              <span>4 Subjects Enrolled</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>18 Documents Indexed</span>
            </div>
            <button
              onClick={() => onNavigate('tutor')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4D956B] hover:text-[#F4F0E8] transition-colors"
            >
              <span>Open Tutor Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Module 2: AI CAREER COACH Portal */}
        <div className="p-6 rounded-xl bg-[#242424]/60 border border-[#D64A45]/30 flex flex-col justify-between group hover:border-[#D64A45]/60 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#A31C1B]/20 border border-[#D64A45]/30 flex items-center justify-center text-[#D64A45]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#F4F0E8]">
                    AI CAREER COACH
                  </h3>
                  <div className="text-xs text-[#D64A45]">
                    Career Workspace
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs text-[#F4F0E8] bg-[#171717] px-2 py-1 rounded border border-[#343434]">
                {profile.careerReadiness}% Job Ready
              </span>
            </div>

            <p className="text-xs text-[#A7A7A0] leading-relaxed">
              Personalized technical job roadmap, DSA practice tracking, Flutter systems architecture, and mock technical interviews.
            </p>

            <div className="p-3 bg-[#171717] rounded-lg border border-[#343434] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F4F0E8] font-medium">Target: {profile.targetRole}</span>
                <span className="font-mono text-[11px] text-[#D64A45]">Stage 2 of 3</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#A7A7A0]">
                <span>Active: Riverpod Offline Cache &amp; Kahn Topological Sort</span>
                <span className="font-mono">142 problems solved</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#343434] flex items-center justify-between">
            <div className="text-xs text-[#A7A7A0]">
              <span>6 Core Skills Tracked</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>Next: System Design</span>
            </div>
            <button
              onClick={() => onNavigate('coach')}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#D64A45] hover:text-[#F4F0E8] transition-colors"
            >
              <span>Open Career Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Daily Task Planner & Daily Learning Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Daily Learning Planner (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                Daily Learning Planner
              </h3>
              <p className="text-xs text-[#A7A7A0]">
                {pendingTasks.length} pending academic &amp; career actions for today
              </p>
            </div>
            <span className="text-xs font-mono text-[#A7A7A0]">
              {tasks.filter((t) => t.completed).length}/{tasks.length} Completed
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-[#171717]/40 border-[#343434]/40 opacity-60'
                    : 'bg-[#171717] border-[#343434] hover:border-[#A7A7A0]/40'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-xs focus:outline-none"
                  aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4D956B]" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#A7A7A0]" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-medium truncate ${
                        task.completed ? 'line-through text-[#A7A7A0]' : 'text-[#F4F0E8]'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        task.relatedTo === 'tutor'
                          ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/30'
                          : 'bg-[#242424] text-[#D64A45] border border-[#D64A45]/30'
                      }`}
                    >
                      {task.relatedTo === 'tutor' ? 'Tutor' : 'Coach'}
                    </span>
                  </div>
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

        {/* Right: AI Memory Grounded Recommendations */}
        <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#4D956B]" />
            <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
              AI Mentor Guidance
            </h3>
          </div>
          <p className="text-xs text-[#A7A7A0]">
            Proactive recommendations derived from your previous chat discussions and syllabus difficulty markers.
          </p>

          <div className="space-y-3">
            {DEMO_AI_RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                className="p-3 bg-[#171717] rounded-lg border border-[#343434] space-y-2 hover:border-[#4D956B]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      rec.mode === 'tutor' ? 'text-[#4D956B]' : 'text-[#D64A45]'
                    }`}
                  >
                    {rec.mode === 'tutor' ? 'Academic Revision' : 'Career Skill'}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#F4F0E8]">
                  {rec.title}
                </h4>
                <p className="text-[11px] text-[#A7A7A0] leading-relaxed">
                  {rec.reason}
                </p>
                <button
                  onClick={() => onOpenChat(`Help me with: ${rec.title}`, rec.mode)}
                  className="w-full mt-1 py-1.5 px-2 bg-[#242424] hover:bg-[#343434] text-[11px] font-medium text-[#F4F0E8] rounded transition-colors text-center border border-[#343434]"
                >
                  {rec.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
