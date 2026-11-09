import React, { useState } from 'react';
import {
  X,
  Database,
  Layers,
  Smartphone,
  Server,
  ShieldCheck,
  Brain,
  Code2,
  ExternalLink,
  ChevronRight,
  GitBranch,
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'schema' | 'flutter' | 'memory_rag' | 'setup'
  >('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-4xl h-[88vh] bg-[#171717] rounded-xl border border-[#343434] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#343434] bg-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#06110C] border border-[#4D956B]/40 flex items-center justify-center text-[#4D956B]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-[#F4F0E8]">
                AI Study Mate — Production System Architecture
              </h2>
              <p className="text-xs text-[#A7A7A0]">
                Engineering Blueprint · 9-Point Technical Specification · PostgreSQL &amp; Flutter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A7A7A0] hover:text-[#F4F0E8] hover:bg-[#343434] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="px-6 py-2 border-b border-[#343434] bg-[#171717] flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: '1. Architecture & Specs' },
            { id: 'schema', label: '2. Database ERD & Schema' },
            { id: 'memory_rag', label: '3. Persistent Memory & RAG' },
            { id: 'flutter', label: '4. Flutter Mobile App Engine' },
            { id: 'setup', label: '5. Cloud & Codespaces Setup' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-1.5 px-3 rounded-md font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#242424] text-[#F4F0E8] border border-[#343434]'
                  : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#F4F0E8] leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-[#242424]/40 border border-[#343434] space-y-2">
                <h4 className="font-heading font-semibold text-sm text-[#4D956B]">
                  Executive System Architecture
                </h4>
                <p className="text-[#A7A7A0]">
                  AI Study Mate unifies two autonomous, intelligent agents (<strong>AI Exam Tutor</strong> and <strong>AI Career Coach</strong>) linked through an encrypted PostgreSQL persistent memory plane.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#06110C] border border-[#4D956B]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#4D956B] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#4D956B]"></span>
                    <span>AI EXAM TUTOR Workspace</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#A7A7A0] text-[11px]">
                    <li>Hierarchical syllabus management (Subjects → Units → Topics).</li>
                    <li>RAG retrieval pipeline with pgvector (chunk size: 500 tokens, overlap: 80).</li>
                    <li>Mark-calibrated answers (2, 5, 10 marks) with strict verbatim citation policy.</li>
                    <li>Mock test evaluation rubric with step-by-step mathematical proofs.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#242424] border border-[#D64A45]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#D64A45] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#D64A45]"></span>
                    <span>AI CAREER COACH Workspace</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#A7A7A0] text-[11px]">
                    <li>Goal-driven roadmaps with milestones (e.g. Full Stack &amp; Mobile Engineer).</li>
                    <li>Skill proficiency tracking with separate Completion vs Mastery indices.</li>
                    <li>Daily sprint planner with priority scheduling &amp; duration budgets.</li>
                    <li>Technical interview simulators with complexity analysis (Big-O).</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#242424]/40 border border-[#343434] space-y-3">
                <h4 className="font-heading font-semibold text-sm text-[#F4F0E8]">
                  Official Visual Identity Tokens
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-[#171717] border border-[#343434]">
                    <div className="w-4 h-4 rounded bg-[#171717] border border-[#343434] mb-1" />
                    <span>Charcoal Black</span>
                    <span className="block text-[#A7A7A0]">#171717</span>
                  </div>
                  <div className="p-2 rounded bg-[#06110C] border border-[#4D956B]/40">
                    <div className="w-4 h-4 rounded bg-[#06110C] border border-[#4D956B] mb-1" />
                    <span>Forest Green</span>
                    <span className="block text-[#4D956B]">#06110C / #4D956B</span>
                  </div>
                  <div className="p-2 rounded bg-[#242424] border border-[#D64A45]/40">
                    <div className="w-4 h-4 rounded bg-[#A31C1B] mb-1" />
                    <span>Crimson Red</span>
                    <span className="block text-[#D64A45]">#A31C1B / #D64A45</span>
                  </div>
                  <div className="p-2 rounded bg-[#242424] border border-[#343434]">
                    <div className="w-4 h-4 rounded bg-[#F4F0E8] mb-1" />
                    <span>Ivory White</span>
                    <span className="block text-[#A7A7A0]">#F4F0E8</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-sm text-[#4D956B]">
                Normalized PostgreSQL Relational Schema (Supabase)
              </h4>
              <p className="text-xs text-[#A7A7A0]">
                Strict Row-Level Security (RLS) is applied so that <code>auth.uid() = user_id</code> isolates student materials and memory insights.
              </p>

              <div className="p-3 bg-[#242424] rounded-lg border border-[#343434] font-mono text-[11px] text-[#A7A7A0] overflow-x-auto space-y-1">
                <div className="text-[#F4F0E8] font-bold">-- 1. profiles &amp; persistent memory</div>
                <div>CREATE TABLE profiles (id UUID PRIMARY KEY REFERENCES auth.users, name TEXT, email TEXT, target_role TEXT, gpa NUMERIC(3,2), created_at TIMESTAMPTZ);</div>
                <div>CREATE TABLE student_memory (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id), category TEXT, title TEXT, content TEXT, confidence NUMERIC(3,2), last_updated TIMESTAMPTZ);</div>
                <div>CREATE TABLE memory_embeddings (id UUID PRIMARY KEY, memory_id UUID REFERENCES student_memory(id) ON DELETE CASCADE, embedding vector(768));</div>
                <br />
                <div className="text-[#F4F0E8] font-bold">-- 2. academic subjects, syllabus &amp; documents</div>
                <div>CREATE TABLE subjects (id UUID PRIMARY KEY, user_id UUID REFERENCES profiles(id), name TEXT, code TEXT, exam_date DATE, progress INT);</div>
                <div>CREATE TABLE syllabus_units (id UUID PRIMARY KEY, subject_id UUID REFERENCES subjects(id), unit_number INT, title TEXT);</div>
                <div>CREATE TABLE syllabus_topics (id UUID PRIMARY KEY, unit_id UUID REFERENCES syllabus_units(id), name TEXT, status TEXT, difficulty TEXT);</div>
                <div>CREATE TABLE documents (id UUID PRIMARY KEY, user_id UUID REFERENCES profiles(id), subject_id UUID REFERENCES subjects(id), title TEXT, file_url TEXT, chunks_count INT);</div>
                <div>CREATE TABLE document_chunks (id UUID PRIMARY KEY, document_id UUID REFERENCES documents(id) ON DELETE CASCADE, page INT, chunk_text TEXT, embedding vector(768));</div>
                <br />
                <div className="text-[#F4F0E8] font-bold">-- 3. career roadmap, skills &amp; tasks</div>
                <div>CREATE TABLE skills (id UUID PRIMARY KEY, user_id UUID REFERENCES profiles(id), name TEXT, category TEXT, proficiency INT, target INT, score INT);</div>
                <div>CREATE TABLE career_roadmaps (id UUID PRIMARY KEY, user_id UUID REFERENCES profiles(id), target_role TEXT, current_stage INT);</div>
                <div>CREATE TABLE learning_tasks (id UUID PRIMARY KEY, user_id UUID REFERENCES profiles(id), title TEXT, related_to TEXT, duration_mins INT, completed BOOLEAN, due_date TIMESTAMPTZ);</div>
              </div>
            </div>
          )}

          {activeTab === 'memory_rag' && (
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-sm text-[#4D956B]">
                Dual Retrieval Pipeline: Semantic Memory + Document RAG
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#242424]/60 border border-[#343434] space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#F4F0E8]">
                    <Brain className="w-4 h-4 text-[#4D956B]" />
                    <span>Cross-Chat Persistent Memory</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[#A7A7A0]">
                    <li>Conversation concludes or student specifies an instruction.</li>
                    <li>LLM memory extractor parses candidate key-values (Academic / Career).</li>
                    <li>New candidate memory validated and embedded via <code>text-embedding-004</code>.</li>
                    <li>At new conversation start: Semantic search retrieves top-k relevant memories.</li>
                    <li>Context injected into system prompt before first student question.</li>
                  </ol>
                </div>

                <div className="p-4 rounded-lg bg-[#242424]/60 border border-[#343434] space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#F4F0E8]">
                    <Database className="w-4 h-4 text-[#4D956B]" />
                    <span>Academic Document RAG</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[#A7A7A0]">
                    <li>PDF / DOCX uploaded to private Supabase Storage bucket.</li>
                    <li>Edge Function splits text into 500-token chunks with 80-token overlap.</li>
                    <li>Embeddings saved to <code>document_chunks</code> table with <code>pgvector</code> index.</li>
                    <li>Cosine distance query filters by <code>subject_id</code> and <code>user_id</code>.</li>
                    <li>AI answer includes exact Page Number &amp; Chapter citation.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flutter' && (
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-sm text-[#4D956B]">
                Official Flutter Mobile Application Architecture
              </h4>
              <p className="text-xs text-[#A7A7A0]">
                Clean Feature-First Architecture using Riverpod or BLoC state management:
              </p>

              <div className="p-3 bg-[#242424] rounded-lg border border-[#343434] font-mono text-[11px] text-[#A7A7A0] space-y-1">
                <div>lib/</div>
                <div className="pl-4">├── core/</div>
                <div className="pl-8">├── theme/ (brand_colors.dart, typography.dart)</div>
                <div className="pl-8">├── network/ (supabase_client.dart, api_endpoints.dart)</div>
                <div className="pl-8">└── storage/ (hive_cache.dart, secure_vault.dart)</div>
                <div className="pl-4">├── features/</div>
                <div className="pl-8">├── tutor/ (presentation/, domain/, data/)</div>
                <div className="pl-8">├── coach/ (presentation/, domain/, data/)</div>
                <div className="pl-8">├── chat/ (presentation/chat_screen.dart, riverpod/chat_notifier.dart)</div>
                <div className="pl-8">├── memory/ (presentation/memory_hub.dart)</div>
                <div className="pl-8">└── analytics/ (presentation/progress_dashboard.dart)</div>
                <div className="pl-4">└── shared/widgets/ (luxury_card.dart, metric_ring.dart)</div>
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-sm text-[#4D956B]">
                Zero-Friction Cloud &amp; Codespaces Setup
              </h4>
              <div className="space-y-3 text-xs text-[#A7A7A0]">
                <div className="p-3 bg-[#242424] rounded-lg border border-[#343434]">
                  <strong className="text-[#F4F0E8] block mb-1">1. GitHub Codespaces Execution:</strong>
                  <span>Pre-configured devcontainer runs Flutter Web, Node.js, and Supabase CLI directly inside any browser without consuming your local RAM.</span>
                </div>
                <div className="p-3 bg-[#242424] rounded-lg border border-[#343434]">
                  <strong className="text-[#F4F0E8] block mb-1">2. Required Cloud Services:</strong>
                  <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[11px]">
                    <li><strong>Supabase:</strong> PostgreSQL with pgvector extension + Auth + Storage.</li>
                    <li><strong>Google Gemini API:</strong> Model orchestration for tutor &amp; coach.</li>
                    <li><strong>GitHub Actions:</strong> Automated build &amp; test pipeline.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
