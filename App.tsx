import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { ReviewPanel } from './components/ReviewPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { OnboardingModal } from './components/OnboardingModal';
import type { Task, LogsByDate, Mood, DailyLog, UserProfile } from './types';

function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const App: React.FC = () => {
  const [logsByDate, setLogsByDate] = useLocalStorage<LogsByDate>('tasksByDate', {});
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('userProfile', null);

  const currentLog = useMemo<DailyLog>(() => logsByDate[selectedDate] || { tasks: [], mood: null }, [logsByDate, selectedDate]);

  const updateCurrentLog = (updates: Partial<DailyLog>) => {
    const newLog = { ...currentLog, ...updates };
    setLogsByDate(prev => ({ ...prev, [selectedDate]: newLog }));
  };

  const handleAddTask = (text: string, startTime?: string, endTime?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      startTime,
      endTime,
    };
    updateCurrentLog({ tasks: [...currentLog.tasks, newTask] });
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = currentLog.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateCurrentLog({ tasks: updatedTasks });
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = currentLog.tasks.filter(task => task.id !== id);
    updateCurrentLog({ tasks: updatedTasks });
  };
  
  const handleSetMood = (mood: Mood) => {
    updateCurrentLog({ mood });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  }

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  if (!userProfile) {
    return <OnboardingModal onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto mb-6">
            <label htmlFor="date-picker" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                選擇日期
            </label>
            <input 
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full md:w-auto p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TaskList
            tasks={currentLog.tasks}
            mood={currentLog.mood}
            onAddTask={handleAddTask}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onSetMood={handleSetMood}
          />
          <ReviewPanel tasks={currentLog.tasks} mood={currentLog.mood} userProfile={userProfile} />
        </div>
      </main>
    </div>
  );
};

export default App;