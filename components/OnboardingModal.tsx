import React, { useState } from 'react';
import type { UserProfile, CommunicationStyle } from '../types';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

const communicationStyles: { id: CommunicationStyle; label: string; description: string }[] = [
    { id: 'supportive', label: '溫暖鼓勵', description: 'AI 會像個親切的朋友，給你滿滿的正能量。'},
    { id: 'direct', label: '直接坦率', description: 'AI 會一針見血，直接點出問題和改進建議。'},
    { id: 'formal', label: '嚴謹專業', description: 'AI 會像位顧問，提供結構化、專業的分析。'},
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goals, setGoals] = useState('');
  const [challenges, setChallenges] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState<CommunicationStyle>('supportive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && role.trim() && goals.trim() && challenges.trim()) {
      onComplete({ name, role, goals, challenges, communicationStyle });
    }
  };
  
  const isFormValid = name.trim() && role.trim() && goals.trim() && challenges.trim();

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transform transition-all">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">個人化設定</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
            只需一分鐘，告訴 AI 如何成為你最好的工作夥伴。
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">我該如何稱呼你？</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="例如：小明" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
             </div>
             <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">你的職位/角色是？</label>
                <input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} placeholder="例如：軟體工程師" required className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
             </div>
          </div>
          <div>
             <label htmlFor="goals" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">你的主要工作目標是什麼？</label>
             <textarea id="goals" value={goals} onChange={e => setGoals(e.target.value)} rows={2} placeholder="例如：提升專案管理效率、學習新技術..." required className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"></textarea>
          </div>
           <div>
             <label htmlFor="challenges" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">目前工作上最大的挑戰是？</label>
             <textarea id="challenges" value={challenges} onChange={e => setChallenges(e.target.value)} rows={2} placeholder="例如：常常被會議打斷、很難專注..." required className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"></textarea>
          </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">希望 AI 用哪種風格與你溝通？</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {communicationStyles.map(style => (
                        <button key={style.id} type="button" onClick={() => setCommunicationStyle(style.id)} className={`text-left p-4 rounded-lg border-2 transition-all ${communicationStyle === style.id ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/50 dark:border-blue-500' : 'bg-slate-100 border-slate-200 hover:border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:hover:border-slate-500'}`}>
                           <p className="font-semibold text-slate-800 dark:text-slate-200">{style.label}</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{style.description}</p>
                        </button>
                    ))}
                </div>
            </div>

          <button type="submit" disabled={!isFormValid} className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors">
            儲存並開始使用
          </button>
        </form>
      </div>
    </div>
  );
};
