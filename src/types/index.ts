export type NavigationTab = 'home' | 'tutor' | 'coach' | 'progress' | 'profile';

export type WorkspaceMode = 'tutor' | 'coach';

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  university: string;
  degree: string;
  academicYear: string;
  currentGpa: number;
  targetRole: string;
  streakDays: number;
  totalStudyHours: number;
  completedTasksCount: number;
  overallProgress: number; // 0-100
  careerReadiness: number; // 0-100
  academicPreparedness: number; // 0-100
}

export interface SyllabusTopic {
  id: string;
  name: string;
  status: 'completed' | 'learning' | 'pending';
  difficulty: 'easy' | 'medium' | 'hard';
  notes?: string;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  title: string;
  topicsCount: number;
  completedTopics: number;
  topics: SyllabusTopic[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  examDate: string;
  progress: number; // 0-100
  syllabusCompletion: number;
  difficultTopicsCount: number;
  lastStudied: string;
  units: SyllabusUnit[];
  documentsCount: number;
  pyqsCount: number;
}

export interface UploadedMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'docx' | 'notes' | 'pyq' | 'assignment';
  subjectId: string;
  subjectName: string;
  uploadedAt: string;
  size: string;
  pageCount: number;
  chunksIndexed: number;
  verifiedRAG: boolean;
}

export interface TechnicalSkill {
  id: string;
  name: string;
  category: 'Core CS' | 'Languages' | 'Systems' | 'Web & Cloud' | 'AI & Data';
  currentProficiency: number; // 0-100
  targetProficiency: number;
  completedLessons: number;
  practiceQuestionsSolved: number;
  assessmentScore: number;
  lastStudied: string;
  nextRecommendedAction: string;
}

export interface CareerRoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  durationWeeks: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  milestones: string[];
  skillsFocused: string[];
}

export interface LearningTask {
  id: string;
  title: string;
  description: string;
  skillCategory: string;
  durationMinutes: number;
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate: string;
  relatedTo: 'tutor' | 'coach';
  subjectOrSkill: string;
}

export interface AIMemoryItem {
  id: string;
  category: 'profile' | 'academic' | 'career' | 'conversation';
  title: string;
  content: string;
  confidence: number;
  lastUpdated: string;
  isShared: boolean;
  sourceContext: string;
}

export interface StudyActivity {
  id: string;
  date: string;
  day: string;
  hours: number;
  subjectOrSkill: string;
  mode: WorkspaceMode;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode: WorkspaceMode;
  citations?: {
    documentName: string;
    page: number;
    chunkText: string;
  }[];
  retrievedMemoryKeys?: string[];
}
