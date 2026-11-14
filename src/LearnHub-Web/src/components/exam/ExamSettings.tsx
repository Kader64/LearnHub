export interface ExamSettings {
  attemptNumber: number;
  maxAttempts: number | null; // null = unlimited
  passMarkPercent: number;
  timeLimitMinutes: number;
  maxFocusLosses: number;
}

// Mock settings. In the real app these come from the API.
export const examSettings: ExamSettings = {
  attemptNumber: 2,
  maxAttempts: null,
  passMarkPercent: 70,
  timeLimitMinutes: 25,
  maxFocusLosses: 3,
};