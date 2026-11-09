import React, { useState } from 'react';
import { DEMO_PROFILE, DEMO_STUDY_ACTIVITIES, DEMO_SKILLS, DEMO_TASKS } from '../../data/demoData';
import {
  BarChart2,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Brain,
  FileCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const ProgressAnalytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter'>('week');

  const totalWeeklyHours = DEMO_STUDY_ACTIVITIES.reduce((acc, curr) => acc + curr.hours, 0);
  const tutorHours = DEMO_STUDY_ACTIVITIES.filter((a) => a.mode === 'tutor').reduce((acc, curr) => acc + curr.hours, 0);
  const coachHours = DEMO_STUDY_ACTIVITIES.filter((a) => a.mode === 'coach').reduce((acc, curr) => acc + curr.hours, 0);

  const completedTasks = DEMO_TASKS.filter((t) => t.completed).length;
  const totalTasks = DEMO_TASKS.length;
  const roadmapCompletionPercent = Math.round((completedTasks / totalTasks) * 100);

  const maxHours = Math.max(...DEMO_STUDY_ACTIVITIES.map((a) => a.hours));

  return (
    <div className="space-y-8 pb-12">
      {/* Analytics Header */}
      <div className="p-6 rounded-xl bg-[#242424]/60 border border-[#343434]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-xl font-bold text-[#F4F0E8]">
                Learning Progress &amp; Analytics
              </h1>
              <span className="text-xs font-mono text-[#F4F0E8] bg-[#171717] px-2 py-0.5 rounded border border-[#343434]">
                Verified Records
              </span>
            </div>
            <p className="text-xs text-[#A7A7A0] mt-1">
              Grounded in actual database logs. Distinguishing curriculum completion from verified diagnostic skill mastery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#171717] rounded-lg border border-[#343434]">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeFilter === 'week'
                  ? 'bg-[#242424] text-[#F4F0E8] shadow-sm'
                  : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeFilter === 'month'
                  ? 'bg-[#242424] text-[#F4F0E8] shadow-sm'
                  : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('quarter')}
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeFilter === 'quarter'
                  ? 'bg-[#242424] text-[#F4F0E8] shadow-sm'
                  : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* Completion vs Mastery Dual Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A7A7A0]">
                Metric Dimension 1
              </span>
              <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                Roadmap Task Completion
              </h3>
            </div>
            <span className="text-2xl font-bold font-mono text-[#F4F0E8] tabular-nums">
              {roadmapCompletionPercent}%
            </span>
          </div>
          <p className="text-xs text-[#A7A7A0] leading-relaxed">
            Measures the proportion of planned academic chapters read and career sprint tasks completed ({completedTasks} of {totalTasks} sprint items checked).
          </p>
          <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden border border-[#343434]">
            <div
              className="h-full bg-[#F4F0E8] rounded-full transition-all duration-500"
              style={{ width: `${roadmapCompletionPercent}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#4D956B]">
                Metric Dimension 2
              </span>
              <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                Diagnostic Skill Mastery
              </h3>
            </div>
            <span className="text-2xl font-bold font-mono text-[#4D956B] tabular-nums">
              74%
            </span>
          </div>
          <p className="text-xs text-[#A7A7A0] leading-relaxed">
            Calculated strictly from objective mock exam evaluations, timed coding problem scores, and rubric-verified answer submissions.
          </p>
          <div className="w-full bg-[#171717] h-2 rounded-full overflow-hidden border border-[#343434]">
            <div
              className="h-full bg-[#4D956B] rounded-full transition-all duration-500"
              style={{ width: `74%` }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Study Hours Bar Chart & Workspace Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bar Chart (2 columns) */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                Daily Study Hours (Last 7 Days)
              </h3>
              <p className="text-xs text-[#A7A7A0]">
                Total: <span className="font-mono text-[#F4F0E8] font-bold">{totalWeeklyHours.toFixed(1)} hours</span> logged
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#A7A7A0]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#4D956B]"></span>
                Tutor ({tutorHours.toFixed(1)}h)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#D64A45]"></span>
                Coach ({coachHours.toFixed(1)}h)
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="pt-4 flex items-end justify-between gap-3 h-48 border-b border-[#343434] pb-2">
            {DEMO_STUDY_ACTIVITIES.map((activity) => {
              const heightPercent = Math.round((activity.hours / (maxHours || 1)) * 100);
              return (
                <div key={activity.id} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-[#A7A7A0] group-hover:text-[#F4F0E8] transition-colors tabular-nums">
                    {activity.hours}h
                  </span>
                  <div className="w-full max-w-[36px] bg-[#171717] rounded-t overflow-hidden h-36 flex items-end">
                    <div
                      className={`w-full rounded-t transition-all duration-500 ${
                        activity.mode === 'tutor'
                          ? 'bg-[#4D956B] group-hover:bg-[#4D956B]/80'
                          : 'bg-[#D64A45] group-hover:bg-[#D64A45]/80'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-[#A7A7A0]">
                    {activity.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly AI Learning Report */}
        <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#4D956B]" />
            <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
              Weekly AI Synthesis
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#A7A7A0] block">
            Generated Nov 09, 2026
          </span>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="font-semibold text-[#4D956B] block mb-1">
                Accomplished
              </span>
              <p className="text-[#A7A7A0]">
                Completed 42 total tasks. Solved topological sort algorithms and mastered Operating Systems synchronization Peterson proof.
              </p>
            </div>

            <div className="p-3 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="font-semibold text-[#D64A45] block mb-1">
                Identified Weak Area
              </span>
              <p className="text-[#A7A7A0]">
                Demand Paging effective memory access time calculations require targeted numerical problem practice.
              </p>
            </div>

            <div className="p-3 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="font-semibold text-[#F4F0E8] block mb-1">
                Next Week Focus
              </span>
              <p className="text-[#A7A7A0]">
                Unit 3 Virtual Memory completion + LeetCode Medium Sliding Window 5-problem sprint.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Chronological Learning History */}
      <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
        <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
          Chronological Learning Activity Log
        </h3>
        <p className="text-xs text-[#A7A7A0]">
          Audit trail of study sessions, problem submissions and mock tests.
        </p>

        <div className="divide-y divide-[#343434]">
          {DEMO_STUDY_ACTIVITIES.slice().reverse().map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    act.mode === 'tutor' ? 'bg-[#4D956B]' : 'bg-[#D64A45]'
                  }`}
                />
                <div>
                  <h4 className="text-xs font-semibold text-[#F4F0E8]">
                    {act.subjectOrSkill}
                  </h4>
                  <p className="text-[11px] text-[#A7A7A0]">
                    {act.notes}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-[#F4F0E8] tabular-nums">
                  {act.hours} hrs
                </span>
                <span className="text-[10px] text-[#A7A7A0] block font-mono">
                  {act.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
