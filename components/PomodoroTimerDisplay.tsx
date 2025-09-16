import React from 'react';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroTimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  mode: PomodoroMode;
}

export const PomodoroTimerDisplay: React.FC<PomodoroTimerDisplayProps> = ({ secondsLeft, totalSeconds, mode }) => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    const colorClasses: Record<PomodoroMode, string> = {
        work: 'stroke-blue-500',
        shortBreak: 'stroke-green-500',
        longBreak: 'stroke-teal-500'
    };

    const textColorClasses: Record<PomodoroMode, string> = {
        work: 'text-blue-600 dark:text-blue-400',
        shortBreak: 'text-green-600 dark:text-green-400',
        longBreak: 'text-teal-600 dark:text-teal-400'
    };
    
    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full" viewBox="0 0 200 200">
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    strokeWidth="12"
                    className="stroke-slate-200 dark:stroke-slate-700"
                    fill="none"
                />
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    strokeWidth="12"
                    className={`transform -rotate-90 origin-center transition-all duration-500 ${colorClasses[mode]}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <span className={`text-5xl font-bold font-mono ${textColorClasses[mode]}`}>
                {formattedTime}
            </span>
        </div>
    );
};
