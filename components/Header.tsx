
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          AI 工作日誌 & 複盤
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          記錄您的一天，讓 AI 幫助您成長
        </p>
      </div>
    </header>
  );
};
