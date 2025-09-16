import React, { useState, useEffect, useRef } from 'react';
import type { Task, Mood } from '../types';
import { TaskCard } from './TaskCard';
import { MoodSelector } from './MoodSelector';
import { PomodoroTimerDisplay } from './PomodoroTimerDisplay';
import { EndSessionModal } from './EndSessionModal';
import { PlayIcon, PauseIcon } from './IconComponents';

interface TaskListProps {
  tasks: Task[];
  mood: Mood | null;
  onAddTask: (text: string, startTime?: string, endTime?: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onSetMood: (mood: Mood) => void;
}

const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export const TaskList: React.FC<TaskListProps> = ({ tasks, mood, onAddTask, onToggleComplete, onDelete, onSetMood }) => {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [currentTaskText, setCurrentTaskText] = useState('');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null);
  const [isEndSessionModalOpen, setIsEndSessionModalOpen] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationAudioRef.current = new Audio('https://actions.google.com/sounds/v1/notifications/positive_notification.ogg');
    }
  }, []);

  const switchMode = (newMode: PomodoroMode) => {
    setIsActive(false);
    setMode(newMode);
    switch (newMode) {
      case 'work':
        setSecondsLeft(WORK_DURATION);
        break;
      case 'shortBreak':
        setSecondsLeft(SHORT_BREAK_DURATION);
        break;
      case 'longBreak':
        setSecondsLeft(LONG_BREAK_DURATION);
        break;
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const completeWorkSession = () => {
    const endTime = new Date();
    if (timerStartTime && currentTaskText.trim()) {
      const startTimeFormatted = timerStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const endTimeFormatted = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      onAddTask(currentTaskText, startTimeFormatted, endTimeFormatted);
    }
    setCurrentTaskText('');
    setTimerStartTime(null);
    const newCompletedCount = pomodorosCompleted + 1;
    setPomodorosCompleted(newCompletedCount);
    switchMode(newCompletedCount % 4 === 0 ? 'longBreak' : 'shortBreak');
  };

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      notificationAudioRef.current?.play();

      if (mode === 'work') {
        completeWorkSession();
      } else {
        switchMode('work');
      }
    }
  }, [secondsLeft]);

  const toggleTimer = () => {
    if (!isActive && mode === 'work' && !timerStartTime) {
      setTimerStartTime(new Date());
    }
    setIsActive(!isActive);
  };
  
  const handleEndSessionEarly = (reason: string) => {
    setIsEndSessionModalOpen(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    const endTime = new Date();
    if (timerStartTime && currentTaskText.trim()) {
      const startTimeFormatted = timerStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const endTimeFormatted = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const taskTextWithReason = `${currentTaskText} (${reason})`;
      onAddTask(taskTextWithReason, startTimeFormatted, endTimeFormatted);
    }
    
    setCurrentTaskText('');
    setTimerStartTime(null);
    const newCompletedCount = pomodorosCompleted + 1;
    setPomodorosCompleted(newCompletedCount);
    switchMode(newCompletedCount % 4 === 0 ? 'longBreak' : 'shortBreak');
  };

  const totalSeconds = mode === 'work' ? WORK_DURATION : mode === 'shortBreak' ? SHORT_BREAK_DURATION : LONG_BREAK_DURATION;

  const modeConfig: Record<PomodoroMode, {label: string, color: string}> = {
      work: { label: '專注工作', color: 'bg-blue-500 hover:bg-blue-600' },
      shortBreak: { label: '短暫休息', color: 'bg-green-500 hover:bg-green-600' },
      longBreak: { label: '長期休息', color: 'bg-teal-500 hover:bg-teal-600' }
  }

  const isStartButtonDisabled = mode === 'work' && !currentTaskText.trim();

  return (
    <>
      {isEndSessionModalOpen && (
        <EndSessionModal 
          onClose={() => setIsEndSessionModalOpen(false)}
          onConfirm={handleEndSessionEarly}
        />
      )}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">今日工作紀錄</h2>
        
        <div className='mb-6'>
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">今天感覺如何？</h3>
          <MoodSelector selectedMood={mood} onSelectMood={onSetMood} />
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg flex flex-col items-center gap-4">
            <div className="flex gap-2">
                {Object.keys(modeConfig).map(key => (
                    <button key={key} onClick={() => switchMode(key as PomodoroMode)} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${mode === key ? `${modeConfig[key as PomodoroMode].color} text-white shadow` : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                      {modeConfig[key as PomodoroMode].label}
                    </button>
                ))}
            </div>
            
            <PomodoroTimerDisplay secondsLeft={secondsLeft} totalSeconds={totalSeconds} mode={mode} />
            
            <div className="w-full">
              <input
                type="text"
                value={currentTaskText}
                onChange={(e) => setCurrentTaskText(e.target.value)}
                placeholder="現在要專注什麼任務？"
                disabled={isActive || mode !== 'work'}
                className="w-full text-center p-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:bg-slate-200 dark:disabled:bg-slate-700/50"
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <button onClick={toggleTimer} disabled={isStartButtonDisabled} className="w-2/3 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-900 transition-all disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transform hover:scale-105">
                {isActive ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                <span className="text-xl">{isActive ? '暫停' : '開始'}</span>
              </button>
              {isStartButtonDisabled && !isActive && mode === 'work' && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  請先輸入任務名稱以啟動計時器。
                </p>
              )}
              {isActive && mode === 'work' && (
                 <button onClick={() => setIsEndSessionModalOpen(true)} className="mt-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline transition-colors">
                  提前結束
                </button>
              )}
            </div>
        </div>
        
        <div className="mt-6 space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg mt-4">
              <p className="text-slate-500 dark:text-slate-400">尚未新增任何工作紀錄。</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">啟動一個番茄鐘來開始吧！</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};