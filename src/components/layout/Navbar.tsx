import React from 'react';
import { NavigationTab } from '../../types';
import { BookOpen, Briefcase, BarChart2, User, Home, Monitor, Smartphone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenChat: () => void;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenChat,
  isMobilePreview,
  onToggleMobilePreview,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#171717]/90 backdrop-blur-md border-b border-[#343434] px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4D956B]"
          >
            <div className="w-8 h-8 rounded-md bg-[#242424] border border-[#343434] flex items-center justify-center text-sm font-bold tracking-wider text-[#F4F0E8] group-hover:border-[#4D956B] transition-colors">
              <span className="text-[#4D956B]">AI</span>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-[#F4F0E8] whitespace-nowrap">
              AI STUDY MATE
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 nav links, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#F4F0E8] ${
              currentTab === 'home'
                ? 'text-[#F4F0E8] font-semibold border-b-2 border-[#F4F0E8]'
                : 'text-[#A7A7A0]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('tutor')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#4D956B] flex items-center gap-1.5 ${
              currentTab === 'tutor'
                ? 'text-[#4D956B] font-semibold border-b-2 border-[#4D956B]'
                : 'text-[#A7A7A0]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4D956B]"></span>
            Tutor
          </button>
          <button
            onClick={() => onSelectTab('coach')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#D64A45] flex items-center gap-1.5 ${
              currentTab === 'coach'
                ? 'text-[#D64A45] font-semibold border-b-2 border-[#D64A45]'
                : 'text-[#A7A7A0]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D64A45]"></span>
            Coach
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#F4F0E8] ${
              currentTab === 'progress'
                ? 'text-[#F4F0E8] font-semibold border-b-2 border-[#F4F0E8]'
                : 'text-[#A7A7A0]'
            }`}
          >
            My Progress
          </button>
          <button
            onClick={() => onSelectTab('profile')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-[#F4F0E8] ${
              currentTab === 'profile'
                ? 'text-[#F4F0E8] font-semibold border-b-2 border-[#F4F0E8]'
                : 'text-[#A7A7A0]'
            }`}
          >
            Profile &amp; Memory
          </button>
        </nav>

        {/* Zone 3: 1 primary action & responsive device simulator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobilePreview}
            title={isMobilePreview ? "Switch to Wide Desktop View" : "Simulate Flutter Mobile Screen"}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A7A7A0] hover:text-[#F4F0E8] bg-[#242424] hover:bg-[#343434] border border-[#343434] rounded-lg transition-colors whitespace-nowrap"
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#4D956B]" />
                <span className="hidden sm:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#D64A45]" />
                <span className="hidden sm:inline">Mobile Preview</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#171717] bg-[#F4F0E8] hover:bg-white rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#171717]" />
            <span>Ask AI Mate</span>
          </button>
        </div>
      </div>
    </header>
  );
};
