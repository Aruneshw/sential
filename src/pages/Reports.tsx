import React from 'react';
import { BarChart3, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Reports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-primary-900 tracking-tight">System Reports</h1>
                <p className="text-sm text-textMuted mt-1">Prototype analytics and metrics.</p>
                <div className="mt-4 bg-blue-50 border border-blue-100 text-blue-800 text-sm p-4 rounded-lg">
                    <strong>Note:</strong> IV-Sentinel is a prototype system. The analytics presented here are for monitoring-assistance insights and do not represent clinical performance claims.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Infusions (Week)', value: '142', icon: BarChart3, color: 'text-primary-600', bg: 'bg-primary-50' },
                    { label: 'Normal Completions', value: '118', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50' },
                    { label: 'Avg Acknowledge Time', value: '1.4 min', icon: Clock, color: 'text-info', bg: 'bg-purple-50' },
                    { label: 'Flow Abnormalities', value: '7', icon: AlertTriangle, color: 'text-warning', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface rounded-xl p-5 shadow-card border border-slate-100 flex items-center">
                        <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-surface rounded-xl shadow-card border border-slate-100 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <BarChart3 className="h-16 w-16 text-slate-200 mb-4" />
                <h2 className="text-xl font-bold text-slate-700">Detailed Reports Module</h2>
                <p className="text-slate-500 max-w-md mt-2">
                    Detailed visual analytics, reporting exports, and historical performance charts will be available in Phase 2 of the prototype implementation.
                </p>
            </div>

        </div>
    );
};

export default Reports;
