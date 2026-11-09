import React, { useState } from 'react';
import { Subject, SyllabusTopic, UploadedMaterial } from '../../types';
import { DEMO_SUBJECTS, DEMO_MATERIALS } from '../../data/demoData';
import {
  BookOpen,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronDown,
  Sparkles,
  BookCheck,
  Award,
  Layers,
  ArrowRight,
  HelpCircle,
  FileCode,
  FileQuestion,
  Filter,
} from 'lucide-react';

interface TutorWorkspaceProps {
  onOpenChat: (initialPrompt?: string, mode?: 'tutor' | 'coach') => void;
}

export const TutorWorkspace: React.FC<TutorWorkspaceProps> = ({ onOpenChat }) => {
  const [subjects, setSubjects] = useState<Subject[]>(DEMO_SUBJECTS);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub_os');
  const [materials, setMaterials] = useState<UploadedMaterial[]>(DEMO_MATERIALS);
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const [selectedMarks, setSelectedMarks] = useState<2 | 5 | 10>(10);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'materials' | 'exam_blueprint' | 'mock_test'>('syllabus');

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const handleToggleTopicStatus = (unitId: string, topicId: string) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== currentSubject.id) return sub;
        const updatedUnits = sub.units.map((unit) => {
          if (unit.id !== unitId) return unit;
          const updatedTopics = unit.topics.map((top) => {
            if (top.id !== topicId) return top;
            const nextStatus: SyllabusTopic['status'] =
              top.status === 'completed'
                ? 'learning'
                : top.status === 'learning'
                ? 'pending'
                : 'completed';
            return { ...top, status: nextStatus };
          });
          const completedCount = updatedTopics.filter((t) => t.status === 'completed').length;
          return {
            ...unit,
            topics: updatedTopics,
            completedTopics: completedCount,
          };
        });

        const totalTopics = updatedUnits.reduce((acc, u) => acc + u.topicsCount, 0);
        const totalCompleted = updatedUnits.reduce((acc, u) => acc + u.completedTopics, 0);
        const newCompletion = Math.round((totalCompleted / (totalTopics || 1)) * 100);

        return {
          ...sub,
          units: updatedUnits,
          syllabusCompletion: newCompletion,
        };
      })
    );
  };

  const handleSimulateUpload = () => {
    const newDoc: UploadedMaterial = {
      id: `mat_${Date.now()}`,
      title: `${currentSubject.name} — Lecture Notes & Exam Prep Handout`,
      type: 'notes',
      subjectId: currentSubject.id,
      subjectName: currentSubject.name,
      uploadedAt: 'Just now',
      size: '3.2 MB',
      pageCount: 32,
      chunksIndexed: 118,
      verifiedRAG: true,
    };
    setMaterials([newDoc, ...materials]);
  };

  const filteredMaterials = materials.filter(
    (m) =>
      (m.subjectId === currentSubject.id || searchDocQuery) &&
      m.title.toLowerCase().includes(searchDocQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Workspace Header with Forest Green branding */}
      <div className="p-6 rounded-xl bg-[#06110C] border border-[#4D956B]/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4D956B]/20 border border-[#4D956B]/40 flex items-center justify-center text-[#4D956B]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-[#F4F0E8]">
                  AI EXAM TUTOR
                </h1>
                <span className="text-xs font-mono text-[#4D956B] bg-[#171717] px-2 py-0.5 rounded border border-[#4D956B]/30">
                  Academic Workspace
                </span>
              </div>
              <p className="text-xs text-[#A7A7A0] mt-0.5">
                Curriculum-grounded learning, syllabus topic mastery, and university-calibrated answer generation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onOpenChat(
                  `Generate a 10-mark comprehensive answer on "${currentSubject.name}: Demand Paging with TLB Hit Ratio & Page Fault Routine" with textbook citations.`,
                  'tutor'
                )
              }
              className="px-4 py-2 text-xs font-semibold text-[#06110C] bg-[#4D956B] hover:bg-[#4D956B]/90 rounded-lg transition-transform active:scale-95 shadow-sm whitespace-nowrap"
            >
              Ask AI Tutor
            </button>
          </div>
        </div>

        {/* Subject selector segmented tabs */}
        <div className="mt-6 pt-4 border-t border-[#343434] flex items-center gap-2 overflow-x-auto pb-1">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                selectedSubjectId === sub.id
                  ? 'bg-[#242424] text-[#F4F0E8] border border-[#4D956B]/60 shadow-sm'
                  : 'text-[#A7A7A0] hover:bg-[#242424]/40 hover:text-[#F4F0E8]'
              }`}
            >
              <span>{sub.name}</span>
              <span className="text-[10px] font-mono opacity-60">({sub.code})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Key Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Syllabus Completion</span>
          <div className="text-2xl font-bold font-mono text-[#4D956B] mt-1 tabular-nums">
            {currentSubject.syllabusCompletion}%
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            Based on unit topic status
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Target Exam Date</span>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] mt-1">
            {currentSubject.examDate}
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            University Final Exam
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Uploaded Materials</span>
          <div className="text-2xl font-bold font-mono text-[#F4F0E8] mt-1 tabular-nums">
            {currentSubject.documentsCount} <span className="text-xs font-normal text-[#A7A7A0]">files</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            Indexed with pgvector
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434]">
          <span className="text-xs text-[#A7A7A0]">Difficult Topics</span>
          <div className="text-2xl font-bold font-mono text-[#D64A45] mt-1 tabular-nums">
            {currentSubject.difficultTopicsCount} <span className="text-xs font-normal text-[#A7A7A0]">flagged</span>
          </div>
          <p className="text-[11px] text-[#A7A7A0] mt-2">
            Targeted for revision
          </p>
        </div>
      </div>

      {/* Section View Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#242424] rounded-lg border border-[#343434] max-w-xl">
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'syllabus'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Syllabus Units &amp; Topics
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'materials'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Document Library ({filteredMaterials.length})
        </button>
        <button
          onClick={() => setActiveTab('exam_blueprint')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'exam_blueprint'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Answer Blueprint
        </button>
        <button
          onClick={() => setActiveTab('mock_test')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'mock_test'
              ? 'bg-[#171717] text-[#F4F0E8] shadow-sm'
              : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
          }`}
        >
          Mock Exam
        </button>
      </div>

      {/* View 1: Syllabus Units & Topics */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#A7A7A0]">
            <p>Click any topic to cycle status: <span className="text-[#4D956B]">Completed</span> → <span className="text-[#D64A45]">Learning</span> → <span className="text-[#A7A7A0]">Pending</span>.</p>
            <span className="font-mono">Unit-wise curriculum breakdown</span>
          </div>

          <div className="space-y-4">
            {currentSubject.units.map((unit) => (
              <div
                key={unit.id}
                className="p-5 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-[#171717] border border-[#343434] flex items-center justify-center text-xs font-mono text-[#4D956B]">
                      {unit.unitNumber}
                    </span>
                    <h3 className="font-heading font-semibold text-sm text-[#F4F0E8]">
                      {unit.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#A7A7A0]">
                    {unit.completedTopics}/{unit.topicsCount} Topics ({Math.round((unit.completedTopics / unit.topicsCount) * 100)}%)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {unit.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleToggleTopicStatus(unit.id, topic.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        topic.status === 'completed'
                          ? 'bg-[#06110C]/60 border-[#4D956B]/30 text-[#F4F0E8]'
                          : topic.status === 'learning'
                          ? 'bg-[#242424] border-[#D64A45]/40 text-[#F4F0E8]'
                          : 'bg-[#171717] border-[#343434] text-[#A7A7A0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {topic.status === 'completed' && (
                          <CheckCircle2 className="w-4 h-4 text-[#4D956B] shrink-0" />
                        )}
                        {topic.status === 'learning' && (
                          <Clock className="w-4 h-4 text-[#D64A45] shrink-0" />
                        )}
                        {topic.status === 'pending' && (
                          <AlertCircle className="w-4 h-4 text-[#A7A7A0] shrink-0" />
                        )}
                        <span className="text-xs truncate font-medium">
                          {topic.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-mono uppercase ${
                          topic.difficulty === 'hard'
                            ? 'text-[#D64A45]'
                            : topic.difficulty === 'medium'
                            ? 'text-[#F4F0E8]'
                            : 'text-[#4D956B]'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Document Library (RAG) */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#A7A7A0]" />
              <input
                type="text"
                placeholder="Search indexed textbook chunks &amp; PYQs..."
                value={searchDocQuery}
                onChange={(e) => setSearchDocQuery(e.target.value)}
                className="w-full bg-[#242424] border border-[#343434] rounded-lg pl-9 pr-3 py-2 text-xs text-[#F4F0E8] placeholder:text-[#A7A7A0]/60 focus:outline-none focus:border-[#4D956B]"
              />
            </div>

            <button
              onClick={handleSimulateUpload}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#F4F0E8] bg-[#242424] hover:bg-[#343434] border border-[#343434] rounded-lg transition-colors whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5 text-[#4D956B]" />
              <span>Upload Study Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-[#171717] border border-[#343434] flex items-center justify-center text-[#4D956B] shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-[#F4F0E8] truncate">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-[#A7A7A0]">
                        {doc.subjectName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#06110C] text-[#4D956B] border border-[#4D956B]/30 shrink-0">
                    RAG Ready
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#A7A7A0] pt-2 border-t border-[#343434]/50">
                  <span>{doc.size}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.pageCount} Pages</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[#4D956B]">{doc.chunksIndexed} Embeddings</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() =>
                      onOpenChat(
                        `Explain key examination topics from "${doc.title}" with page references.`,
                        'tutor'
                      )
                    }
                    className="w-full py-1.5 text-xs text-[#F4F0E8] hover:text-[#4D956B] bg-[#171717] hover:bg-[#242424] rounded border border-[#343434] transition-colors"
                  >
                    Query Material via AI Tutor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Exam Answer Blueprint Generator */}
      {activeTab === 'exam_blueprint' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                  Mark-Calibrated Answer Structure
                </h3>
                <p className="text-xs text-[#A7A7A0]">
                  Generate university answers formatted according to marks: concise definitions for 2 marks, structured headings for 5 marks, and exhaustive diagrams/proofs for 10 marks.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-[#171717] rounded-lg border border-[#343434] shrink-0">
                <button
                  onClick={() => setSelectedMarks(2)}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    selectedMarks === 2
                      ? 'bg-[#4D956B] text-[#06110C] font-semibold'
                      : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                  }`}
                >
                  2 Marks
                </button>
                <button
                  onClick={() => setSelectedMarks(5)}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    selectedMarks === 5
                      ? 'bg-[#4D956B] text-[#06110C] font-semibold'
                      : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                  }`}
                >
                  5 Marks
                </button>
                <button
                  onClick={() => setSelectedMarks(10)}
                  className={`px-3 py-1 text-xs font-mono rounded ${
                    selectedMarks === 10
                      ? 'bg-[#4D956B] text-[#06110C] font-semibold'
                      : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                  }`}
                >
                  10 Marks
                </button>
              </div>
            </div>

            {/* Generated Answer Demonstration Preview */}
            <div className="p-5 rounded-lg bg-[#171717] border border-[#343434] space-y-4">
              <div className="flex items-center justify-between border-b border-[#343434] pb-3">
                <span className="text-xs font-mono text-[#4D956B]">
                  Question: "Explain Demand Paging, Page Fault Handling Routine, and calculate Effective Memory Access Time (EMAT)."
                </span>
                <span className="text-xs font-mono text-[#F4F0E8]">
                  Weightage: {selectedMarks} Marks
                </span>
              </div>

              {selectedMarks === 2 && (
                <div className="space-y-2 text-xs text-[#F4F0E8] leading-relaxed">
                  <p>
                    <strong className="text-[#4D956B]">Definition:</strong> Demand paging is a virtual memory management technique where pages are brought into physical RAM only when referenced during program execution (lazy swapper / pager).
                  </p>
                  <p className="text-[#A7A7A0]">
                    <strong className="text-[#F4F0E8]">Source:</strong> Silberschatz &amp; Galvin (10th Ed), Chapter 9, Page 389.
                  </p>
                </div>
              )}

              {selectedMarks === 5 && (
                <div className="space-y-3 text-xs text-[#F4F0E8] leading-relaxed">
                  <div>
                    <h5 className="font-semibold text-[#4D956B] mb-1">1. Concept &amp; Mechanism</h5>
                    <p className="text-[#A7A7A0]">
                      Combines paging with dynamic backing-store swapping. Valid/invalid bit in the page table indicates if page is in memory (v) or on disk (i).
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#4D956B] mb-1">2. Page Fault Handling Steps</h5>
                    <ol className="list-decimal pl-4 space-y-1 text-[#A7A7A0]">
                      <li>CPU references invalid address; trap is triggered to OS kernel.</li>
                      <li>Kernel verifies address legality using internal PCB structures.</li>
                      <li>Free physical frame allocated from available pool.</li>
                      <li>Disk I/O scheduled to read missing page into frame.</li>
                      <li>Page table updated to valid, and interrupted instruction restarted.</li>
                    </ol>
                  </div>
                </div>
              )}

              {selectedMarks === 10 && (
                <div className="space-y-4 text-xs text-[#F4F0E8] leading-relaxed">
                  <div>
                    <h5 className="font-semibold text-[#4D956B] mb-1">1. Architectural Overview &amp; Hardware Support</h5>
                    <p className="text-[#A7A7A0]">
                      Demand paging relies on MMU address translation, Translation Lookaside Buffer (TLB), and disk storage. If TLB miss occurs, page table is inspected. If bit is 'i' (invalid), page fault exception (software interrupt) invokes the OS handler.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-[#4D956B] mb-1">2. Mathematical Derivation: Effective Memory Access Time (EMAT)</h5>
                    <div className="p-3 bg-[#242424] rounded border border-[#343434] font-mono text-[11px] text-[#F4F0E8] space-y-1">
                      <div>EMAT = (1 - p) × ma + p × (Page_Fault_Overhead)</div>
                      <div className="text-[#A7A7A0]">Where:</div>
                      <div className="text-[#A7A7A0]">· p = Page fault rate (0 ≤ p ≤ 1)</div>
                      <div className="text-[#A7A7A0]">· ma = Normal memory access latency (e.g. 100 ns)</div>
                      <div className="text-[#A7A7A0]">· Page_Fault_Overhead ≈ 8 milliseconds (8,000,000 ns)</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-[#4D956B] mb-1">3. Step-by-Step Kernel Service Sequence</h5>
                    <p className="text-[#A7A7A0]">
                      Includes context switch, disk controller queue wait, swap-in DMA transfer, TLB invalidation, and PCB register restoration for deterministic instruction restart.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#343434] text-[11px] text-[#A7A7A0] flex items-center justify-between">
                    <span>Verified Citations: Silberschatz &amp; Galvin (10th Ed) §9.2 p.394; 2024 University Midterm Q4(b)</span>
                    <button
                      onClick={() => onOpenChat('Explain this EMAT derivation with a numerical problem from my past year paper', 'tutor')}
                      className="text-[#4D956B] hover:underline"
                    >
                      Practice Numerical
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View 4: Mock Examination & Answer Evaluation */}
      {activeTab === 'mock_test' && (
        <div className="p-6 rounded-xl bg-[#242424]/40 border border-[#343434] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#F4F0E8]">
                Standard University Mock Examination
              </h3>
              <p className="text-xs text-[#A7A7A0]">
                Timed diagnostic test generated directly from your uploaded syllabus and previous year questions.
              </p>
            </div>
            <button
              onClick={() => onOpenChat(`Conduct a 15-minute diagnostic mock test on ${currentSubject.name} Unit 1 & 2`, 'tutor')}
              className="px-4 py-2 text-xs font-semibold text-[#06110C] bg-[#4D956B] hover:bg-[#4D956B]/90 rounded-lg transition-transform active:scale-95 shadow-sm whitespace-nowrap"
            >
              Start Diagnostic Mock Test
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="text-xs text-[#A7A7A0]">Last Mock Score</span>
              <div className="text-2xl font-bold font-mono text-[#4D956B] mt-1">
                82/100
              </div>
              <p className="text-[11px] text-[#A7A7A0] mt-1">
                Attempted on Nov 08, 2026
              </p>
            </div>

            <div className="p-4 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="text-xs text-[#A7A7A0]">Rubric Accuracy</span>
              <div className="text-2xl font-bold font-mono text-[#F4F0E8] mt-1">
                91%
              </div>
              <p className="text-[11px] text-[#A7A7A0] mt-1">
                Formula &amp; definition completeness
              </p>
            </div>

            <div className="p-4 bg-[#171717] rounded-lg border border-[#343434]">
              <span className="text-xs text-[#A7A7A0]">Identified Weak Area</span>
              <div className="text-base font-semibold text-[#D64A45] mt-1 truncate">
                TLB Access Calculations
              </div>
              <p className="text-[11px] text-[#A7A7A0] mt-1">
                Requires 2 numerical drills
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
