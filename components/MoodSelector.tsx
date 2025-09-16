import React from 'react';
import type { Mood } from '../types';
import {
  MoodRadIcon,
  MoodGoodIcon,
  MoodOkayIcon,
  MoodBadIcon,
  MoodAwfulIcon,
} from './IconComponents';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const moods: { mood: Mood; icon: React.FC<{}>; label: string }[] = [
  { mood: 'awful', icon: MoodAwfulIcon, label: '糟透了' },
  { mood: 'bad', icon: MoodBadIcon, label: '不太好' },
  { mood: 'okay', icon: MoodOkayIcon, label: '普通' },
  { mood: 'good', icon: MoodGoodIcon, label: '不錯' },
  { mood: 'rad', icon: MoodRadIcon, label: '很棒' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="flex justify-around items-center bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl">
      {moods.map(({ mood, icon: Icon, label }) => (
        <button
          key={mood}
          onClick={() => onSelectMood(mood)}
          className={`relative flex flex-col items-center gap-1.5 p-1 rounded-md transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 ${
            selectedMood === mood
              ? 'scale-95' // Pressed effect
              : 'hover:scale-105' // Hover effect
          }`}
          aria-label={`Select mood: ${label}`}
          title={label}
        >
          <div
            className={`w-10 h-10 transition-all duration-200 rounded-full ${
              selectedMood === mood
                ? 'shadow-inner' // Inset shadow for pressed effect
                : 'shadow-md' // Outer shadow for raised effect
            }`}
          >
            <Icon />
          </div>
          <span className={`text-xs font-semibold transition-opacity duration-200 ${
            selectedMood === mood ? 'opacity-100 text-slate-800 dark:text-slate-200' : 'opacity-50 text-slate-500 dark:text-slate-400'
          }`}>{label}</span>
        </button>
      ))}
    </div>
  );
};
