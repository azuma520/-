export type Mood = 'rad' | 'good' | 'okay' | 'bad' | 'awful';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO string
  startTime?: string; // e.g., "09:00"
  endTime?: string;   // e.g., "17:30"
}

export interface DailyLog {
  tasks: Task[];
  mood: Mood | null;
}

export interface LogsByDate {
  [date: string]: DailyLog;
}

export type CommunicationStyle = 'direct' | 'supportive' | 'formal';

export interface UserProfile {
    name: string;
    role: string;
    goals: string;
    challenges: string;
    communicationStyle: CommunicationStyle;
}