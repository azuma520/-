
import React from 'react';
import type { Task } from '../types';
import { TrashIcon, ClockIcon } from './IconComponents';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-4 flex-grow">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
        />
        <div className="flex-grow">
            <span className={`text-slate-800 dark:text-slate-200 ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
            {task.text}
            </span>
            {task.startTime && task.endTime && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <ClockIcon className="w-3 h-3" />
                    <span>{task.startTime}</span> - <span>{task.endTime}</span>
                </div>
            )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-4"
        aria-label="Delete task"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};