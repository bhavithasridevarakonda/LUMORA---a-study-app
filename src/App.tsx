import React, { useState } from 'react';
import { NavigationTab, WorkspaceMode, StudentProfile } from './types';
import { DEMO_TASKS, DEMO_PROFILE } from './data/demoData';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { TutorWorkspace } from './components/tutor/TutorWorkspace';
import { CoachWorkspace } from './components/coach/CoachWorkspace';
import { ProgressAnalytics } from './components/progress/ProgressAnalytics';
import { StudentProfileView } from './components/profile/StudentProfileView';
import { AIChatModal } from './components/chat/AIChatModal';
import { ArchitectureModal } from './components/shared/ArchitectureModal';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [profile, setProfile] = useState<StudentProfile>(DEMO_PROFILE);
  const [tasks, setTasks] = useState(DEMO_TASKS);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>();
  const [chatMode, setChatMode] = useState<WorkspaceMode>('tutor');
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleOpenChat = (prompt?: string, mode: WorkspaceMode = 'tutor') => {
    setChatPrompt(prompt);
    setChatMode(mode);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F0E8] font-sans selection:bg-[#4D956B]/30 selection:text-white">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenChat={() => handleOpenChat()}
        isMobilePreview={isMobilePreview}
        onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
      />

      {/* Main Layout Container */}
      <div className="flex">
        {/* Desktop Persistent Left Sidebar (hidden in simulated mobile mode) */}
        {!isMobilePreview && (
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onOpenArchitecture={() => setIsArchitectureOpen(true)}
            profile={profile}
          />
        )}

        {/* Content Viewport */}
        <main
          className={`flex-1 transition-all ${
            isMobilePreview
              ? 'p-4 sm:p-8 flex justify-center items-start bg-[#06110C]/40 min-h-[calc(100vh-65px)]'
              : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'
          }`}
        >
          {isMobilePreview ? (
            /* Mobile Device Simulator Container */
            <div className="w-full max-w-[400px] bg-[#171717] border border-[#343434] rounded-[36px] shadow-2xl overflow-hidden flex flex-col h-[820px] relative">
              {/* Phone Speaker & Status bar */}
              <div className="h-6 bg-[#171717] flex items-center justify-between px-6 pt-2 shrink-0 border-b border-[#343434]/40 text-[10px] text-[#A7A7A0] font-mono">
                <span>9:41</span>
                <div className="w-16 h-3 bg-[#242424] rounded-full mx-auto" />
                <span>5G · 100%</span>
              </div>

              {/* Scrollable phone screen area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {currentTab === 'home' && (
                  <HomeDashboard
                    onNavigate={setCurrentTab}
                    onOpenChat={handleOpenChat}
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    profile={profile}
                  />
                )}
                {currentTab === 'tutor' && (
                  <TutorWorkspace onOpenChat={handleOpenChat} />
                )}
                {currentTab === 'coach' && (
                  <CoachWorkspace
                    onOpenChat={handleOpenChat}
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                  />
                )}
                {currentTab === 'progress' && <ProgressAnalytics />}
                {currentTab === 'profile' && (
                  <StudentProfileView
                    profile={profile}
                    onUpdateProfile={handleUpdateProfile}
                  />
                )}
              </div>

              {/* Bottom Nav inside Phone Container */}
              <div className="absolute bottom-0 left-0 right-0">
                <MobileNav currentTab={currentTab} onSelectTab={setCurrentTab} />
              </div>
            </div>
          ) : (
            /* Standard Responsive Web Layout */
            <div>
              {currentTab === 'home' && (
                <HomeDashboard
                  onNavigate={setCurrentTab}
                  onOpenChat={handleOpenChat}
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  profile={profile}
                />
              )}
              {currentTab === 'tutor' && (
                <TutorWorkspace onOpenChat={handleOpenChat} />
              )}
              {currentTab === 'coach' && (
                <CoachWorkspace
                  onOpenChat={handleOpenChat}
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                />
              )}
              {currentTab === 'progress' && <ProgressAnalytics />}
              {currentTab === 'profile' && (
                <StudentProfileView
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation for actual narrow browser screens */}
      {!isMobilePreview && (
        <MobileNav currentTab={currentTab} onSelectTab={setCurrentTab} />
      )}

      {/* Context-Aware AI Chat Flyout / Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialPrompt={chatPrompt}
        initialMode={chatMode}
      />

      {/* Production Architecture & Engineering Blueprint Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}
