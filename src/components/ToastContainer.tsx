import React from 'react';
import { useData } from '../context/DataContext';

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useData();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
            {toasts.map(toast => (
                <div key={toast.id} className="bg-slate-800 text-white p-4 rounded-xl shadow-lg pointer-events-auto min-w-[300px] flex justify-between items-start animate-in slide-in-from-bottom border border-slate-700">
                    <div>
                        <p className="font-semibold text-sm">{toast.message}</p>
                        {toast.details && <p className="text-xs text-slate-300 mt-1">{toast.details}</p>}
                    </div>
                    <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white ml-4 flex-shrink-0">
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};
export default ToastContainer;
