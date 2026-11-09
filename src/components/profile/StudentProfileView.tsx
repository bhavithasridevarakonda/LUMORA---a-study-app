import React, { useState } from 'react';
import { AIMemoryItem, StudentProfile } from '../../types';
import { DEMO_MEMORIES } from '../../data/demoData';
import {
  User,
  Brain,
  Shield,
  Trash2,
  Edit3,
  Edit2,
  Plus,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Flame,
  Clock,
  Sparkles,
  Info,
  Lock,
  X,
  Camera,
  Check,
  AlertCircle,
} from 'lucide-react';

interface StudentProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

const PRESET_AVATARS = [
  {
    label: 'Current Portrait',
    url: '/src/assets/images/student_avatar_profile_1794236211342.jpg',
  },
  {
    label: 'Academic Style',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Tech Minimalist',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
];

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [memories, setMemories] = useState<AIMemoryItem[]>(DEMO_MEMORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AIMemoryItem['category']>('academic');

  // Edit Profile Modal state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editUniversity, setEditUniversity] = useState(profile.university);
  const [editDegree, setEditDegree] = useState(profile.degree);
  const [editAcademicYear, setEditAcademicYear] = useState(profile.academicYear);
  const [editGpa, setEditGpa] = useState(profile.currentGpa.toString());
  const [editTargetRole, setEditTargetRole] = useState(profile.targetRole);
  const [editAvatarUrl, setEditAvatarUrl] = useState(profile.avatarUrl);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleOpenEditModal = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setEditUniversity(profile.university);
    setEditDegree(profile.degree);
    setEditAcademicYear(profile.academicYear);
    setEditGpa(profile.currentGpa.toString());
    setEditTargetRole(profile.targetRole);
    setEditAvatarUrl(profile.avatarUrl);
    setFormError(null);
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setFormError('Please enter a valid student name.');
      return;
    }
    const gpaNum = parseFloat(editGpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
      setFormError('GPA must be a valid number between 0.0 and 10.0');
      return;
    }

    const updatedData: Partial<StudentProfile> = {
      name: editName.trim(),
      email: editEmail.trim(),
      university: editUniversity.trim(),
      degree: editDegree.trim(),
      academicYear: editAcademicYear.trim(),
      currentGpa: Number(gpaNum.toFixed(2)),
      targetRole: editTargetRole.trim(),
      avatarUrl: editAvatarUrl.trim() || profile.avatarUrl,
    };

    onUpdateProfile(updatedData);

    // Also update persistent memory if profile memory exists
    setMemories((prev) =>
      prev.map((mem) => {
        if (mem.category === 'profile' && mem.id === 'mem_1') {
          return {
            ...mem,
            title: `Career Ambition & Target Role for ${editName.trim()}`,
            content: `Student ${editName.trim()} is targeting: ${editTargetRole.trim()}. Prefers deep technical explanations and university examination focus.`,
            lastUpdated: 'Just now (Synced from Profile Edit)',
          };
        }
        return mem;
      })
    );

    setIsEditProfileOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const filteredMemories =
    selectedCategory === 'all'
      ? memories
      : memories.filter((m) => m.category === selectedCategory);

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleStartEdit = (item: AIMemoryItem) => {
    setEditingMemoryId(item.id);
    setEditContent(item.content);
  };

  const handleSaveEdit = (id: string) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, content: editContent, lastUpdated: 'Just now' } : m
      )
    );
    setEditingMemoryId(null);
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: AIMemoryItem = {
      id: `mem_${Date.now()}`,
      category: newCategory,
      title: newTitle,
      content: newContent,
      confidence: 1.0,
      lastUpdated: 'Just now',
      isShared: true,
      sourceContext: 'Manual Student Input',
    };

    setMemories([newItem, ...memories]);
    setNewTitle('');
    setNewContent('');
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#06110C] border border-[#4D956B] text-xs text-[#F4F0E8] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#4D956B]" />
            <span>Profile details updated successfully! Synchronized across Tutor, Coach, and Persistent Memory.</span>
          </div>
          <button
            onClick={() => setShowSuccessToast(false)}
            className="text-[#A7A7A0] hover:text-[#F4F0E8]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Student Identity Card */}
      <div className="p-6 rounded-xl bg-[#242424]/60 border border-[#343434]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border border-[#343434]"
              />
              <button
                onClick={handleOpenEditModal}
                className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity text-[10px] font-medium"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-[#F4F0E8]">
                  {profile.name}
                </h1>
                <span className="text-[10px] font-mono text-[#4D956B] bg-[#06110C] px-2 py-0.5 rounded border border-[#4D956B]/40">
                  Verified Student
                </span>
              </div>
              <p className="text-xs text-[#A7A7A0]">
                {profile.degree} · {profile.university}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A7A7A0] pt-1">
                <span>{profile.academicYear}</span>
                <span aria-hidden="true">·</span>
                <span>GPA: <strong className="text-[#F4F0E8]">{profile.currentGpa.toFixed(2)} / 10</strong></span>
                <span aria-hidden="true">·</span>
                <span className="text-[#D64A45]">{profile.streakDays}-Day Streak</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A7A7A0]">{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-2 bg-[#171717] rounded-lg border border-[#343434] text-xs">
              <span className="text-[#A7A7A0] block text-[10px] uppercase font-mono">Target Career Goal</span>
              <span className="font-semibold text-[#F4F0E8]">{profile.targetRole}</span>
            </div>

            <button
              onClick={handleOpenEditModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#F4F0E8] bg-[#242424] hover:bg-[#343434] border border-[#343434] hover:border-[#4D956B]/60 rounded-lg transition-colors whitespace-nowrap"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#4D956B]" />
              <span>Edit Profile Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-2xl bg-[#171717] rounded-xl border border-[#343434] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#343434] bg-[#242424] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#06110C] border border-[#4D956B]/40 flex items-center justify-center text-[#4D956B]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#F4F0E8]">
                    Edit Student Profile Details
                  </h3>
                  <p className="text-[11px] text-[#A7A7A0]">
                    Modify your academic credentials, name, email, target role and learning preferences.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1.5 text-[#A7A7A0] hover:text-[#F4F0E8] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-5 text-xs">
              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#242424] border border-[#D64A45]/50 text-[#D64A45] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#4D956B] uppercase tracking-wider block">
                  1. Personal &amp; Account Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      Full Student Name <span className="text-[#D64A45]">*</span>
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="e.g. Bhavitha R."
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      Email Address <span className="text-[#D64A45]">*</span>
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="e.g. bhavitha7806@gmail.com"
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Credentials */}
              <div className="space-y-3 pt-2 border-t border-[#343434]">
                <span className="text-[11px] font-mono text-[#4D956B] uppercase tracking-wider block">
                  2. Academic Curriculum Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={editUniversity}
                      onChange={(e) => setEditUniversity(e.target.value)}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      Degree &amp; Major
                    </label>
                    <input
                      type="text"
                      value={editDegree}
                      onChange={(e) => setEditDegree(e.target.value)}
                      placeholder="e.g. B.Tech in Computer Science & Engineering"
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      Academic Year / Semester
                    </label>
                    <input
                      type="text"
                      value={editAcademicYear}
                      onChange={(e) => setEditAcademicYear(e.target.value)}
                      placeholder="e.g. 3rd Year (Semester VI)"
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A7A7A0] mb-1">
                      Current GPA (out of 10.0)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={editGpa}
                      onChange={(e) => setEditGpa(e.target.value)}
                      placeholder="8.92"
                      className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] font-mono focus:outline-none focus:border-[#4D956B]"
                    />
                  </div>
                </div>
              </div>

              {/* Career Goal & Avatar */}
              <div className="space-y-3 pt-2 border-t border-[#343434]">
                <span className="text-[11px] font-mono text-[#D64A45] uppercase tracking-wider block">
                  3. Target Career &amp; Profile Picture
                </span>

                <div>
                  <label className="block text-[11px] text-[#A7A7A0] mb-1">
                    Target Career Goal / Aspiring Role
                  </label>
                  <input
                    type="text"
                    value={editTargetRole}
                    onChange={(e) => setEditTargetRole(e.target.value)}
                    placeholder="e.g. Full Stack & Mobile Systems Engineer, Cloud Engineer"
                    className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#D64A45]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#A7A7A0] mb-1.5">
                    Profile Avatar Selection
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={editAvatarUrl}
                      alt="Avatar preview"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#343434] shrink-0"
                    />
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="url"
                        value={editAvatarUrl}
                        onChange={(e) => setEditAvatarUrl(e.target.value)}
                        placeholder="Paste image URL or choose preset below"
                        className="w-full bg-[#242424] border border-[#343434] rounded-lg px-3 py-1.5 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                      />
                      <div className="flex items-center gap-2">
                        {PRESET_AVATARS.map((av, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setEditAvatarUrl(av.url)}
                            className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${
                              editAvatarUrl === av.url
                                ? 'bg-[#4D956B]/20 text-[#4D956B] border-[#4D956B]'
                                : 'bg-[#171717] text-[#A7A7A0] border-[#343434] hover:text-[#F4F0E8]'
                            }`}
                          >
                            {av.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer Buttons */}
              <div className="pt-4 border-t border-[#343434] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#A7A7A0] hover:text-[#F4F0E8] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-[#06110C] bg-[#4D956B] hover:bg-[#4D956B]/90 rounded-lg transition-transform active:scale-95 shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persistent AI Memory Management Section */}
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-[#06110C]/80 border border-[#4D956B]/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4D956B]/20 border border-[#4D956B]/40 flex items-center justify-center text-[#4D956B]">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-[#F4F0E8]">
                  Shared AI Memory Hub
                </h2>
                <p className="text-xs text-[#A7A7A0]">
                  Cross-session intelligence shared between AI Tutor and AI Coach. You retain full control over what the AI remembers.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#171717] bg-[#F4F0E8] hover:bg-white rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-[#171717]" />
              <span>Teach AI New Insight</span>
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#171717] rounded-lg border border-[#343434] text-xs text-[#A7A7A0]">
            <Info className="w-4 h-4 text-[#4D956B] shrink-0" />
            <span>
              When starting a new conversation in Tutor or Coach mode, these verified insights are retrieved via semantic pgvector embeddings to preserve your personalized context.
            </span>
          </div>
        </div>

        {/* Add New Memory Form Drawer */}
        {isAddingNew && (
          <form
            onSubmit={handleCreateMemory}
            className="p-5 rounded-xl bg-[#242424] border border-[#4D956B]/50 space-y-4"
          >
            <h4 className="font-heading font-semibold text-sm text-[#F4F0E8]">
              Add Explicit Memory Insight
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A7A7A0] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#171717] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                >
                  <option value="academic">Academic Memory</option>
                  <option value="career">Career Memory</option>
                  <option value="profile">Student Profile</option>
                  <option value="conversation">Conversation Decision</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono text-[#A7A7A0] mb-1">
                  Insight Headline / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Preparing for GATE Exam or Needs proofs for OS Deadlocks"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#171717] border border-[#343434] rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A7A7A0] mb-1">
                Memory Content &amp; Guidance for the AI
              </label>
              <textarea
                rows={3}
                placeholder="Write specific context you want the AI tutor or coach to always remember..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-[#171717] border border-[#343434] rounded-lg p-3 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-3 py-1.5 text-xs text-[#A7A7A0] hover:text-[#F4F0E8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-[#06110C] bg-[#4D956B] rounded-lg hover:bg-[#4D956B]/90 transition-colors"
              >
                Save Memory Record
              </button>
            </div>
          </form>
        )}

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Dimensions' },
            { id: 'profile', label: 'Profile' },
            { id: 'academic', label: 'Academic (Tutor)' },
            { id: 'career', label: 'Career (Coach)' },
            { id: 'conversation', label: 'Conversation Decisions' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#242424] text-[#F4F0E8] border border-[#343434]'
                  : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Saved Memory Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="p-5 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        mem.category === 'academic'
                          ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/30'
                          : mem.category === 'career'
                          ? 'bg-[#242424] text-[#D64A45] border border-[#D64A45]/30'
                          : 'bg-[#171717] text-[#F4F0E8] border border-[#343434]'
                      }`}
                    >
                      {mem.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#A7A7A0]">
                      Confidence: {Math.round(mem.confidence * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(mem)}
                      className="p-1 text-[#A7A7A0] hover:text-[#F4F0E8] transition-colors"
                      title="Edit Memory Content"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMemory(mem.id)}
                      className="p-1 text-[#A7A7A0] hover:text-[#D64A45] transition-colors"
                      title="Delete Memory Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-heading font-semibold text-xs text-[#F4F0E8]">
                  {mem.title}
                </h4>

                {editingMemoryId === mem.id ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full bg-[#171717] border border-[#343434] rounded p-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#4D956B]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingMemoryId(null)}
                        className="px-2 py-1 text-[11px] text-[#A7A7A0]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(mem.id)}
                        className="px-3 py-1 text-[11px] bg-[#4D956B] text-[#06110C] font-semibold rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#A7A7A0] leading-relaxed">
                    {mem.content}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#343434]/40 flex items-center justify-between text-[11px] text-[#A7A7A0]">
                <span className="truncate max-w-[200px]">
                  Origin: {mem.sourceContext}
                </span>
                <span className="font-mono">{mem.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
