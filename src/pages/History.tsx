import React from 'react';
import { Clock, Filter } from 'lucide-react';

const mockHistory = [
    { id: 1, time: '10:30 AM', date: 'Today', bed: 'BED 103', patient: 'Meena R', event: 'Alert Generated: IV critically low', status: 'CRITICAL', nurse: '-' },
    { id: 2, time: '10:28 AM', date: 'Today', bed: 'BED 104', patient: 'Arun Kumar', event: 'Alert Generated: Possible flow abnormality', status: 'FLOW ABNORMALITY', nurse: '-' },
    { id: 3, time: '10:15 AM', date: 'Today', bed: 'BED 102', patient: 'Suresh Babu', event: 'Alert Acknowledged', status: 'ATTENTION', nurse: 'Nurse Kavya' },
    { id: 4, time: '10:12 AM', date: 'Today', bed: 'BED 102', patient: 'Suresh Babu', event: 'Alert Generated: IV approaching attention threshold', status: 'ATTENTION', nurse: '-' },
    { id: 5, time: '09:00 AM', date: 'Today', bed: 'BED 101', patient: 'Ramesh Kumar', event: 'IV Started - Normal Flow', status: 'NORMAL', nurse: 'Nurse Priya' },
];

const History: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary-900 tracking-tight">Infusion History</h1>
                    <p className="text-sm text-textMuted mt-1">Ward A event logs for monitoring and alerts.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Logs
                </button>
            </div>

            <div className="bg-surface rounded-xl shadow-card border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bed & Patient</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Event</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nurse</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm font-medium text-slate-900">
                                            <Clock className="h-4 w-4 text-slate-400 mr-2" />
                                            {item.time}
                                        </div>
                                        <div className="text-xs text-slate-500 ml-6">{item.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-800">{item.bed}</div>
                                        <div className="text-xs text-slate-500">{item.patient}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        {item.event}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${item.status === 'CRITICAL' ? 'bg-red-50 text-danger border border-red-100' :
                                            item.status === 'FLOW ABNORMALITY' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                item.status === 'ATTENTION' ? 'bg-amber-50 text-warning border border-amber-100' :
                                                    'bg-green-50 text-success border border-green-100'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                        {item.nurse}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
