import React, { useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import BedCard from '../components/BedCard';
import { Activity, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
    const { beds, alerts, nurses, acknowledgeAlert, isBackendOnline } = useData();
    const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
    const [selectedNurseId, setSelectedNurseId] = useState<string | null>(null);

    const totalBeds = beds.length;
    const normalBeds = beds.filter(b => b.overallStatus === 'NORMAL').length;
    const attentionBeds = beds.filter(b => b.overallStatus === 'ATTENTION' || b.overallStatus === 'ACTION REQUIRED').length;
    const criticalBeds = beds.filter(b => b.overallStatus === 'CRITICAL').length;

    const confirmAcknowledge = () => {
        if (selectedAlertId && selectedNurseId) {
            acknowledgeAlert(selectedAlertId, selectedNurseId);
            setSelectedAlertId(null);
            setSelectedNurseId(null);
        }
    };

    const activeAlerts = alerts.filter(a => !a.resolved).sort((a, b) => {
        if (a.priority === 'CRITICAL' && b.priority !== 'CRITICAL') return -1;
        if (a.priority !== 'CRITICAL' && b.priority === 'CRITICAL') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="space-y-6 pb-12">
            <div className="flex max-sm:flex-col justify-between max-sm:items-start items-center mb-2 gap-2">
                <div>
                    <h1 className="text-2xl font-bold text-primary-900 tracking-tight">Ward A Overview</h1>
                    <p className="text-sm text-textMuted">Monitoring assistance system</p>
                </div>
                {isBackendOnline ? (
                    <div className="flex items-center px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-[10px] sm:text-xs font-bold tracking-wide">
                        <span className="relative flex h-2 w-2 mr-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-success"></span>
                            <span className="relative inline-flex rounded-full h-full w-full bg-success"></span>
                        </span>
                        SYSTEM ONLINE
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-slate-100 text-slate-500 border border-slate-200 rounded-full text-[10px] sm:text-xs font-bold tracking-wide flex items-center">
                            <span className="mr-1.5">●</span> BACKEND OFFLINE
                        </div>
                        <div className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-[10px] sm:text-xs font-bold tracking-wide">
                            DEMO DATA V1.0
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title="Monitored Beds"
                    value={totalBeds}
                    icon={Activity}
                    colorClass="text-primary-600"
                    bgClass="bg-primary-50"
                />
                <SummaryCard
                    title="Normal"
                    value={normalBeds}
                    icon={CheckCircle}
                    colorClass="text-success"
                    bgClass="bg-green-50"
                />
                <SummaryCard
                    title="Attention"
                    value={attentionBeds}
                    icon={Navigation}
                    colorClass="text-warning"
                    bgClass="bg-amber-50"
                />
                <SummaryCard
                    title="Critical"
                    value={criticalBeds}
                    icon={AlertTriangle}
                    colorClass="text-danger"
                    bgClass="bg-red-50"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">Patient Overview</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {beds.map(bed => (
                            <BedCard key={bed.id} bed={bed} />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800">Active Alerts</h2>
                    <div className="bg-surface rounded-xl shadow-card border border-slate-100 overflow-hidden flex flex-col xl:h-[calc(100vh-280px)] min-h-[400px]">
                        <div className="overflow-y-auto flex-1 p-2">
                            {activeAlerts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                                    <CheckCircle className="h-10 w-10 mb-2 opacity-50" />
                                    <p className="font-medium text-sm">No active alerts</p>
                                </div>
                            ) : (
                                <div className="space-y-3 p-1 sm:p-2">
                                    {activeAlerts.map(alert => {
                                        const isCritical = alert.priority === 'CRITICAL';
                                        const isActionReq = alert.priority === 'FLOW ABNORMALITY';
                                        const bed = beds.find(b => b.id === alert.bedId);

                                        return (
                                            <div key={alert.id} className={`p-4 rounded-xl border relative transition-all ${alert.acknowledged
                                                ? 'bg-slate-50 border-slate-200'
                                                : isCritical
                                                    ? 'bg-red-50 border-danger/30 shadow-[0_2px_8px_rgba(239,68,68,0.1)]'
                                                    : isActionReq
                                                        ? 'bg-blue-50 border-info/30 shadow-[0_2px_8px_rgba(139,92,246,0.1)]'
                                                        : 'bg-amber-50 border-warning/30'
                                                }`}>

                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center">
                                                        {!alert.acknowledged && (
                                                            <span className="relative flex h-3 w-3 mr-2 sm:mr-3 shrink-0">
                                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? 'bg-danger' : isActionReq ? 'bg-info' : 'bg-warning'
                                                                    }`}></span>
                                                                <span className={`relative inline-flex rounded-full h-3 w-3 ${isCritical ? 'bg-danger' : isActionReq ? 'bg-info' : 'bg-warning'
                                                                    }`}></span>
                                                            </span>
                                                        )}
                                                        <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                                                            {bed?.bedNumber} {bed?.patientName ? `• ${bed.patientName}` : ''}
                                                        </h4>
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium whitespace-nowrap ml-2">
                                                        {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                <p className={`text-sm font-medium mb-3 ${alert.acknowledged ? 'text-slate-500' : 'text-slate-700'}`}>
                                                    {alert.message}
                                                </p>

                                                {!alert.acknowledged && (
                                                    <div className="flex flex-wrap gap-4 mb-4 text-xs font-medium text-slate-600 bg-white/60 p-2 rounded-md">
                                                        <div><span className="opacity-70">Vol:</span> <span className="font-bold text-slate-800">{alert.remainingVolumeMl} mL</span></div>
                                                        <div><span className="opacity-70">ETA:</span> <span className="font-bold text-slate-800">{alert.estimatedMinutesRemaining} min</span></div>
                                                    </div>
                                                )}

                                                {alert.acknowledged ? (
                                                    <div className="flex items-center text-xs font-semibold text-success pt-2 border-t border-slate-200">
                                                        <CheckCircle className="h-4 w-4 mr-1.5" />
                                                        Acknowledged by {alert.acknowledgedBy}
                                                        <span className="text-slate-400 font-normal ml-1">
                                                            at {new Date(alert.acknowledgedAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                ) : selectedAlertId === alert.id ? (
                                                    <div className="pt-3 border-t border-slate-200 mt-2 animate-in fade-in slide-in-from-top-2">
                                                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Select Nurse</label>
                                                        <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto">
                                                            {nurses.map(nurse => (
                                                                <label key={nurse.id} onClick={() => setSelectedNurseId(nurse.id)} className={`flex items-center p-2 rounded-lg cursor-pointer border transition-colors ${selectedNurseId === nurse.id ? 'bg-primary-50 border-primary-500 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${selectedNurseId === nurse.id ? 'border-primary-500' : 'border-slate-300'}`}>
                                                                        {selectedNurseId === nurse.id && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-semibold text-slate-800">{nurse.name}</span>
                                                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{nurse.role}</span>
                                                                    </div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => { setSelectedAlertId(null); setSelectedNurseId(null); }}
                                                                className="flex-1 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                                            >
                                                                CANCEL
                                                            </button>
                                                            <button
                                                                disabled={!selectedNurseId}
                                                                onClick={() => confirmAcknowledge()}
                                                                className="flex-1 py-2 rounded-lg text-sm font-bold bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                CONFIRM
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setSelectedAlertId(alert.id)}
                                                        className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${isCritical
                                                            ? 'bg-white text-danger border border-danger/20 hover:bg-danger hover:text-white shadow-sm'
                                                            : isActionReq
                                                                ? 'bg-white text-info border border-info/20 hover:bg-info hover:text-white shadow-sm'
                                                                : 'bg-white text-warning border border-warning/20 hover:bg-warning hover:text-white shadow-sm'
                                                            }`}
                                                    >
                                                        {isTargetActionReq(alert.priority) ? 'VERIFY' : 'ACKNOWLEDGE'}
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function isTargetActionReq(priority: string) {
    return priority === 'FLOW ABNORMALITY';
}

export default Dashboard;
