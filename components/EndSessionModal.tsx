import React from 'react';

interface EndSessionModalProps {
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const reasons = ['提前完成', '已放棄', '要做別的事情', '其他因素'];

export const EndSessionModal: React.FC<EndSessionModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 transform transition-all">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">提前結束工作</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          請選擇結束本次專注工作的原因。
        </p>

        <div className="mt-6 space-y-2">
          {reasons.map(reason => (
            <button
              key={reason}
              onClick={() => onConfirm(reason)}
              className="w-full text-left p-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reason}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 p-2 text-sm text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          取消
        </button>
      </div>
    </div>
  );
};