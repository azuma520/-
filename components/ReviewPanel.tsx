import React, { useState } from 'react';
import type { Task, Mood, UserProfile } from '../types';
import { getWorkReview } from '../services/geminiService';
import { SparklesIcon } from './IconComponents';

interface ReviewPanelProps {
  tasks: Task[];
  mood: Mood | null;
  userProfile: UserProfile | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
);


export const ReviewPanel: React.FC<ReviewPanelProps> = ({ tasks, mood, userProfile }) => {
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReview = async () => {
    setIsLoading(true);
    setError(null);
    setReview('');
    try {
      const result = await getWorkReview(tasks, mood, userProfile);
      // Basic markdown to HTML conversion
      const formattedResult = result
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
      setReview(formattedResult);
    } catch (e) {
      setError('無法生成複盤反饋，請稍後再試。');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">每日複盤與反饋</h2>
      <button
        onClick={handleGenerateReview}
        disabled={isLoading || tasks.length === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-900 transition-all disabled:bg-green-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>AI 分析中...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            <span>生成今日工作複盤</span>
          </>
        )}
      </button>
      {tasks.length === 0 && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
              請先新增至少一項工作紀錄以進行複盤。
          </p>
      )}

      <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg min-h-[200px] border border-slate-200 dark:border-slate-700">
        {error && <p className="text-red-500">{error}</p>}
        {review ? (
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: review }} />
        ) : (
          !isLoading && <p className="text-slate-400 dark:text-slate-500">點擊按鈕，讓 AI 為您的一天提供總結與建議。</p>
        )}
         {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                <SparklesIcon className="w-10 h-10 animate-pulse text-blue-500"/>
                <p className="mt-2 text-sm">正在為您準備專屬反饋...</p>
            </div>
        )}
      </div>
    </div>
  );
};