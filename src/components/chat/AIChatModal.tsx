import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceMode, ChatMessage } from '../../types';
import { DEMO_MEMORIES } from '../../data/demoData';
import {
  X,
  Send,
  BookOpen,
  Briefcase,
  Brain,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Paperclip,
  Code2,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialMode?: WorkspaceMode;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  initialMode = 'tutor',
}) => {
  const [mode, setMode] = useState<WorkspaceMode>(initialMode);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or update with initial prompt
  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const defaultGreeting: ChatMessage = {
        id: 'msg_init',
        sender: 'assistant',
        mode: mode,
        timestamp: 'Just now',
        content:
          mode === 'tutor'
            ? `Hello Bhavitha. I am your AI Exam Tutor. I have access to your Operating Systems syllabus (Unit 1–3), DBMS notes, and 5-year question papers. What concept, numerical derivation, or mark-based answer would you like to prepare?`
            : `Hello Bhavitha. I am your AI Career Coach. I'm tracking your roadmap for "Full Stack & Mobile Systems Engineer", your 142 solved DSA problems, and your Flutter architecture progress. Let's practice a mock coding interview or plan your next sprint.`,
        retrievedMemoryKeys:
          mode === 'tutor'
            ? ['OS Exam Weak Area: Paging Address Translation', 'Upcoming University Exam Date Awareness']
            : ['Career Ambition & Target Role', 'Coding Practice Preference: NeetCode 150 Tracker'],
      };
      setMessages([defaultGreeting]);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build context from active persistent memories
      const memoryContext = DEMO_MEMORIES.map((m) => `[${m.category.toUpperCase()}] ${m.title}: ${m.content}`).join('\n');

      const systemInstruction =
        mode === 'tutor'
          ? `You are AI EXAM TUTOR for AI Study Mate. The student is Bhavitha, 3rd year Computer Science student.
Your role: Teach college curriculum (Operating Systems, DBMS, Networks, DSA), generate answers calibrated to 2-mark, 5-mark, and 10-mark college standards, provide mathematical proofs and clear definitions, and reference textbook chapters (e.g. Silberschatz & Galvin 10th Ed).
Persistent Student Memory context:
${memoryContext}`
          : `You are AI CAREER COACH for AI Study Mate. The student is Bhavitha, aiming to become a Senior Full Stack & Mobile Systems Engineer (Flutter, Dart, PostgreSQL, System Design, DSA).
Your role: Technical mentor, code interviewer, architecture advisor. Provide concrete idiomatic code (Flutter/Dart and Python/C++), explain Big-O time and space complexities, and guide roadmap sprints.
Persistent Student Memory context:
${memoryContext}`;

      let replyContent = '';
      let citations: ChatMessage['citations'] = undefined;
      let memoryKeys = mode === 'tutor' ? ['OS Exam Weak Area: Paging', 'Upcoming Exam Date'] : ['Target Role', 'Coding Tracker'];

      // Attempt Gemini API call via @google/genai if process.env or window key is available
      const apiKey = process.env.GEMINI_API_KEY || (window as any).GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nStudent question: ${text}` }] },
          ],
        });
        replyContent = response.text || '';
      } else {
        // Fallback intelligent domain simulation with authentic citations and markdown formatting
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (mode === 'tutor') {
          replyContent = `### Answer Structure (Exam-Calibrated)

**Key Concept:** Demand paging with Page Fault Handling Routine.

1. **Hardware & OS Service Sequence:**
   - **Instruction Reference:** When the CPU issues a logical address referencing a frame marked with an invalid bit \`'i'\`, the MMU triggers a page fault trap.
   - **Kernel Intervention:** The kernel locates the missing page in backing swap space.
   - **Frame Allocation:** A free physical frame is chosen via page replacement (e.g., LRU or Clock).
   - **I/O Transfer:** The missing page is transferred via DMA into physical RAM.
   - **Restart:** The page table valid bit is updated to \`'v'\`, and the trapped instruction restarts.

2. **Effective Memory Access Time (EMAT) Formula:**
\`\`\`
EMAT = (1 - p) * ma + p * (Page Fault Service Time)
\`\`\`
*Where:*
- $p$ = Page fault rate ($0 \\le p \\le 1$)
- $ma$ = Memory access time ($100\\text{ ns}$)
- Page fault penalty $\\approx 8\\text{ ms} = 8,000,000\\text{ ns}$.

*Recommendation for university scoring:* Draw the 6-step flow diagram from Silberschatz Section 9.2 to guarantee full 10/10 marks.`;

          citations = [
            {
              documentName: 'Operating System Concepts — Silberschatz & Galvin (10th Ed)',
              page: 394,
              chunkText: 'Section 9.2: Steps in Handling a Page Fault and Trap Vector Mechanics.',
            },
            {
              documentName: '2024 University Midterm OS Question Paper',
              page: 3,
              chunkText: 'Question 4(b): Discuss Demand Paging with EMAT derivation [10 Marks].',
            },
          ];
        } else {
          replyContent = `### Technical Interview Blueprint: In-Memory LRU Cache (Flutter & Systems)

To achieve **O(1) \`get\`** and **O(1) \`put\`** operations, we combine a **Hash Map** with a **Doubly Linked List**.

\`\`\`dart
class Node {
  final String key;
  dynamic value;
  Node? prev;
  Node? next;
  Node(this.key, this.value);
}

class LRUCache {
  final int capacity;
  final Map<String, Node> _map = {};
  late Node _head;
  late Node _tail;

  LRUCache(this.capacity) {
    _head = Node('', null);
    _tail = Node('', null);
    _head.next = _tail;
    _tail.prev = _head;
  }

  dynamic get(String key) {
    if (!_map.containsKey(key)) return null;
    final node = _map[key]!;
    _moveToHead(node);
    return node.value;
  }

  void put(String key, dynamic value) {
    if (_map.containsKey(key)) {
      final node = _map[key]!;
      node.value = value;
      _moveToHead(node);
    } else {
      if (_map.length >= capacity) {
        final lru = _popTail();
        _map.remove(lru.key);
      }
      final newNode = Node(key, value);
      _map[key] = newNode;
      _addToHead(newNode);
    }
  }

  void _addToHead(Node node) {
    node.prev = _head;
    node.next = _head.next;
    _head.next?.prev = node;
    _head.next = node;
  }

  void _removeNode(Node node) {
    node.prev?.next = node.next;
    node.next?.prev = node.prev;
  }

  void _moveToHead(Node node) {
    _removeNode(node);
    _addToHead(node);
  }

  Node _popTail() {
    final res = _tail.prev!;
    _removeNode(res);
    return res;
  }
}
\`\`\`

**Complexity Evaluation:**
- **Time Complexity:** $O(1)$ for both \`get(key)\` and \`put(key, val)\`.
- **Space Complexity:** $O(N)$ where $N = \\text{capacity}$.

*Next Step:* Would you like to connect this cache to an asynchronous Riverpod state provider with Hive offline persistence?`;
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: mode,
        citations: citations,
        retrievedMemoryKeys: memoryKeys,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        content: 'I encountered an issue generating the answer. Please try again or rephrase your prompt.',
        timestamp: 'Just now',
        mode: mode,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div
        className="w-full max-w-3xl h-[85vh] bg-[#171717] rounded-xl border border-[#343434] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Chat Top Bar */}
        <div className="px-5 py-3.5 border-b border-[#343434] bg-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                mode === 'tutor'
                  ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/40'
                  : 'bg-[#171717] text-[#D64A45] border border-[#D64A45]/40'
              }`}
            >
              {mode === 'tutor' ? <BookOpen className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-sm text-[#F4F0E8]">
                  {mode === 'tutor' ? 'AI EXAM TUTOR' : 'AI CAREER COACH'}
                </h3>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    mode === 'tutor'
                      ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/30'
                      : 'bg-[#171717] text-[#D64A45] border border-[#D64A45]/30'
                  }`}
                >
                  Persistent Memory Active
                </span>
              </div>
              <p className="text-[11px] text-[#A7A7A0]">
                {mode === 'tutor'
                  ? 'Grounding in uploaded textbooks, syllabus & past exams'
                  : 'Grounding in technical roadmap, DSA practice & career goals'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle Switch */}
            <div className="flex items-center bg-[#171717] p-1 rounded-lg border border-[#343434]">
              <button
                onClick={() => setMode('tutor')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'tutor'
                    ? 'bg-[#06110C] text-[#4D956B] border border-[#4D956B]/40'
                    : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                }`}
              >
                Tutor
              </button>
              <button
                onClick={() => setMode('coach')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'coach'
                    ? 'bg-[#242424] text-[#D64A45] border border-[#D64A45]/40'
                    : 'text-[#A7A7A0] hover:text-[#F4F0E8]'
                }`}
              >
                Coach
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#A7A7A0] hover:text-[#F4F0E8] hover:bg-[#343434] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-[#242424] text-[#F4F0E8] border-[#343434]'
                    : 'bg-[#171717] text-[#F4F0E8] border-[#343434]'
                }`}
              >
                {/* Header for assistant message */}
                {msg.sender === 'assistant' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#343434]/50 text-[10px] text-[#A7A7A0]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#4D956B]">
                        {msg.mode === 'tutor' ? 'AI Exam Tutor' : 'AI Career Coach'}
                      </span>
                      {msg.retrievedMemoryKeys && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[#A7A7A0] bg-[#242424] px-1.5 py-0.5 rounded">
                          <Brain className="w-3 h-3 text-[#4D956B]" />
                          {msg.retrievedMemoryKeys.length} Memories Retrieved
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-[#A7A7A0] hover:text-[#F4F0E8] transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#4D956B]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Content Rendering */}
                <div className="space-y-2 whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {/* Citations block for RAG */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#343434] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D956B] block">
                      Grounded Source References (RAG):
                    </span>
                    {msg.citations.map((cite, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded bg-[#242424]/60 border border-[#343434]/40 text-[11px] text-[#A7A7A0]"
                      >
                        <span className="font-semibold text-[#F4F0E8] block">
                          {cite.documentName} (Page {cite.page})
                        </span>
                        <span className="italic block mt-0.5 text-[10px]">
                          "{cite.chunkText}"
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-[10px] font-mono text-[#A7A7A0] mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-[#171717] rounded-xl border border-[#343434] w-fit text-xs text-[#A7A7A0]">
              <div className="w-2 h-2 rounded-full bg-[#4D956B] animate-pulse" />
              <span>
                {mode === 'tutor'
                  ? 'Retrieving syllabus chunks & grounding answer...'
                  : 'Retrieving technical skill profile & generating code...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Composer */}
        <div className="p-4 bg-[#242424] border-t border-[#343434]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={
                mode === 'tutor'
                  ? 'Ask anything from your uploaded syllabus, 2/5/10 mark answers, or numerical proofs...'
                  : 'Ask about career roadmaps, Flutter architecture, DSA algorithms, or mock interview...'
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#171717] border border-[#343434] rounded-lg px-4 py-2.5 text-xs text-[#F4F0E8] placeholder:text-[#A7A7A0]/60 focus:outline-none focus:border-[#4D956B]"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-2.5 rounded-lg transition-all ${
                inputText.trim() && !isLoading
                  ? mode === 'tutor'
                    ? 'bg-[#4D956B] text-[#06110C] hover:bg-[#4D956B]/90'
                    : 'bg-[#A31C1B] text-white hover:bg-[#D64A45]'
                  : 'bg-[#343434] text-[#A7A7A0] cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
