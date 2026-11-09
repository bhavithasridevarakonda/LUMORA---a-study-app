import React from 'react';
import { NavigationTab, StudentProfile } from '../../types';
import {
  Home,
  BookOpen,
  Briefcase,
  BarChart2,
  User,
  Brain,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Flame,
  Clock,
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenArchitecture: () => void;
  profile: StudentProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenArchitecture,
  profile,
}) => {
  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-[#343434] bg-[#171717] min-h-[calc(100vh-65px)] p-4">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#A7A7A0]/70 mb-2">
            Navigation
          </p>
          <button
            onClick={() => onSelectTab('home')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'home'
                ? 'bg-[#242424] text-[#F4F0E8] border border-[#343434]'
                : 'text-[#A7A7A0] hover:bg-[#242424]/50 hover:text-[#F4F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#F4F0E8]" />
              <span>Home Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('tutor')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'tutor'
                ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/40'
                : 'text-[#A7A7A0] hover:bg-[#06110C]/40 hover:text-[#4D956B]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#4D956B]" />
              <span>AI Exam Tutor</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4D956B]/15 text-[#4D956B] font-mono">
              Academic
            </span>
          </button>

          <button
            onClick={() => onSelectTab('coach')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'coach'
                ? 'bg-[#242424] text-[#D64A45] border border-[#D64A45]/40'
                : 'text-[#A7A7A0] hover:bg-[#242424]/50 hover:text-[#D64A45]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-[#D64A45]" />
              <span>AI Career Coach</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#A31C1B]/25 text-[#D64A45] font-mono">
              Career
            </span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'progress'
                ? 'bg-[#242424] text-[#F4F0E8] border border-[#343434]'
                : 'text-[#A7A7A0] hover:bg-[#242424]/50 hover:text-[#F4F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart2 className="w-4 h-4 text-[#F4F0E8]" />
              <span>My Progress &amp; History</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'profile'
                ? 'bg-[#242424] text-[#F4F0E8] border border-[#343434]'
                : 'text-[#A7A7A0] hover:bg-[#242424]/50 hover:text-[#F4F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#F4F0E8]" />
              <span>Student Profile &amp; Memory</span>
            </div>
            <Brain className="w-3.5 h-3.5 text-[#4D956B]" />
          </button>
        </div>

        {/* Memory status box */}
        <div className="p-3 bg-[#242424]/60 border border-[#343434] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-[#4D956B]" />
              <span className="text-xs font-semibold text-[#F4F0E8]">Persistent Memory</span>
            </div>
            <span className="text-[10px] font-mono text-[#4D956B]">Active</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] leading-relaxed mb-2.5">
            Cross-chat context preserved across 4 academic &amp; career dimensions.
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A7A7A0] pt-2 border-t border-[#343434]">
            <span>5 Saved Insights</span>
            <button
              onClick={() => onSelectTab('profile')}
              className="text-[#F4F0E8] hover:text-[#4D956B] transition-colors flex items-center"
            >
              Review
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* System Architecture Blueprint trigger */}
        <div className="p-3 bg-[#06110C] border border-[#4D956B]/30 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F0E8] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4D956B]" />
            <span>Architecture &amp; Docs</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mb-2">
            9-point technical specification, ERD &amp; Flutter roadmap.
          </p>
          <button
            onClick={onOpenArchitecture}
            className="w-full py-1.5 px-2 bg-[#242424] hover:bg-[#343434] text-[11px] font-medium text-[#F4F0E8] rounded transition-colors text-center border border-[#343434]"
          >
            View System Architecture
          </button>
        </div>
      </div>

      {/* Student miniature badge */}
      <div className="pt-4 border-t border-[#343434]">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-[#343434]"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#F4F0E8] truncate">
              {profile.name}
            </h4>
            <p className="text-[11px] text-[#A7A7A0] truncate">
              {profile.academicYear}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#D64A45]" title={`${profile.streakDays}-Day Study Streak`}>
            <Flame className="w-3.5 h-3.5" />
            <span>{profile.streakDays}d</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
