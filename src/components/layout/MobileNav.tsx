import React from 'react';
import { NavigationTab } from '../../types';
import { Home, BookOpen, Briefcase, BarChart2, User } from 'lucide-react';

interface MobileNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#171717]/95 backdrop-blur-md border-t border-[#343434] px-2 py-2">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-colors ${
            currentTab === 'home'
              ? 'text-[#F4F0E8] font-semibold'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          <Home className="w-4 h-4 mb-1" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onSelectTab('tutor')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-colors ${
            currentTab === 'tutor'
              ? 'text-[#4D956B] font-semibold'
              : 'text-[#A7A7A0] hover:text-[#4D956B]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-1" />
          <span>Tutor</span>
        </button>

        <button
          onClick={() => onSelectTab('coach')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-colors ${
            currentTab === 'coach'
              ? 'text-[#D64A45] font-semibold'
              : 'text-[#A7A7A0] hover:text-[#D64A45]'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-1" />
          <span>Coach</span>
        </button>

        <button
          onClick={() => onSelectTab('progress')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-colors ${
            currentTab === 'progress'
              ? 'text-[#F4F0E8] font-semibold'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          <BarChart2 className="w-4 h-4 mb-1" />
          <span>Progress</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-colors ${
            currentTab === 'profile'
              ? 'text-[#F4F0E8] font-semibold'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          <User className="w-4 h-4 mb-1" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};
