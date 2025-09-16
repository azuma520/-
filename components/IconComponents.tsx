import React from 'react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

export const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm9 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
    </svg>
);

// Mood Icons - Redesigned by AI v3 (Claymorphism)
const createClayIcon = (face: React.ReactNode, bgColor: string, faceColor: string) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="16" cy="16" r="15" fill={bgColor} />
      <path d="M16 1c8.284 0 15 6.716 15 15 0 .412-.02.82-.055 1.223C30.41 6.84 24.038 1 16 1S1.59 6.84.055 17.223C.02 16.82 0 16.412 0 16 0 7.716 6.716 1 16 1z" fill="white" opacity=".15"/>
      <g fill={faceColor} stroke={faceColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {face}
      </g>
    </g>
  </svg>
);

export const MoodRadIcon: React.FC = () => createClayIcon(
  <>
    <path d="M10.5 12.5 A 1 1 0 0 1 8.5 12.5 A 1 1 0 0 1 10.5 12.5 Z" />
    <path d="M23.5 12.5 A 1 1 0 0 1 21.5 12.5 A 1 1 0 0 1 23.5 12.5 Z" />
    <path d="M9,17 A 8 8 0 0 0 23,17" fill="none" strokeWidth="2" />
  </>, "#22D3EE", "#116A77"
);

export const MoodGoodIcon: React.FC = () => createClayIcon(
  <>
    <circle cx="9.5" cy="12.5" r="1" />
    <circle cx="22.5" cy="12.5" r="1" />
    <path d="M11,18 Q 16 21, 21,18" fill="none" strokeWidth="2" />
  </>, "#A3E635", "#4B691A"
);

export const MoodOkayIcon: React.FC = () => createClayIcon(
  <>
    <circle cx="9.5" cy="12.5" r="1" />
    <circle cx="22.5" cy="12.5" r="1" />
    <path d="M11 19 H 21" fill="none" strokeWidth="2" />
  </>, "#FBBE24", "#7C5D10"
);

export const MoodBadIcon: React.FC = () => createClayIcon(
  <>
    <circle cx="9.5" cy="12.5" r="1" />
    <circle cx="22.5" cy="12.5" r="1" />
    <path d="M11,20 Q 16 17, 21,20" fill="none" strokeWidth="2" />
  </>, "#F97316", "#813B09"
);

export const MoodAwfulIcon: React.FC = () => createClayIcon(
  <>
    <path d="M9,13 L11,11" fill="none" strokeWidth="2" />
    <path d="M23,13 L21,11" fill="none" strokeWidth="2" />
    <path d="M11,21 A 6 6 0 0 1 21,21" fill="none" strokeWidth="2" />
  </>, "#60A5FA", "#255383"
);