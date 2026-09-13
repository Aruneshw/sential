import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Droplets, Activity, Wifi } from 'lucide-react';
import { MOCK_BEDS } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const volumeData = [
    { time: '10:00', volume: 500 },
    { time: '10:15', volume: 450 },
    { time: '10:30', volume: 400 },
    { time: '10:45', volume: 380 },
    { time: '11:00', volume: 360 },
];

const dropRateData = [
    { time: '10:00', rate: 20 },
    { time: '10:15', rate: 19 },
    { time: '10:30', rate: 20 },
    { time: '10:45', rate: 18 },
    { time: '11:00', rate: 18 },
];

const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const bed = MOCK_BEDS.find(b => b.id === id);

    if (!bed) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl font-bold text-slate-800">Bed not found</h2>
                <Link to="/dashboard" className="text-primary-600 hover:underline mt-2 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                </Link>
            </div>
        );
    }

    const getStatusColors = (status: string) => {
        switch (status) {
            case 'NORMAL': return 'bg-success text-white';
            case 'ATTENTION': return 'bg-warning text-white';
            case 'CRITICAL': return 'bg-danger text-white';
            case 'ACTION REQUIRED': return 'bg-info text-white';
            default: return 'bg-slate-500 text-white';
        }
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="flex items-center">
                <Link to="/dashboard" className="mr-4 p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary-900 tracking-tight">{bed.bedNumber} Details</h1>
                    <p className="text-sm text-textMuted">Patient: {bed.patientName} • Device: {bed.deviceId}</p>
                </div>
                <div className={`ml-auto px-4 py-1.5 rounded-md text-sm font-bold tracking-wide uppercase shadow-sm ${getStatusColors(bed.overallStatus)}`}>
                    {bed.overallStatus}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface rounded-xl p-6 shadow-card border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Patient Info</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs text-textMuted font-medium block">Name</span>
                                <span className="text-base font-semibold text-slate-900">{bed.patientName}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-textMuted font-medium block">Age</span>
                                    <span className="text-base font-semibold text-slate-900">{bed.patientAge}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-textMuted font-medium block">Gender</span>
                                    <span className="text-base font-semibold text-slate-900">{bed.patientGender}</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-6 mb-4 border-b border-slate-100 pb-2">IV Details</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs text-textMuted font-medium block">Fluid Type</span>
                                <span className="text-base font-semibold text-slate-900">{bed.fluidType}</span>
                            </div>
                            <div>
                                <span className="text-xs text-textMuted font-medium block">Bottle Capacity</span>
                                <span className="text-base font-semibold text-slate-900">{bed.bottleCapacityMl} mL</span>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-6 mb-4 border-b border-slate-100 pb-2">Device Status</h3>
                        <div className="flex items-center">
                            <Wifi className={`h-5 w-5 mr-3 ${bed.deviceOnline ? 'text-success' : 'text-danger'}`} />
                            <div>
                                <span className="text-sm font-semibold text-slate-900 block">
                                    {bed.deviceOnline ? 'Connected' : 'Offline'}
                                </span>
                                <span className="text-xs text-slate-500">
                                    Last updated: {new Date(bed.lastUpdated).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100">
                            <div className="flex items-center text-sm font-medium text-textMuted mb-2">
                                <Droplets className="h-5 w-5 mr-2 text-primary-500" />
                                Remaining Volume
                            </div>
                            <div className="text-3xl font-bold text-slate-800">
                                {bed.remainingPercentage}%
                            </div>
                            <div className="text-sm font-medium text-slate-500 mt-1">
                                {bed.remainingVolumeMl} mL / {bed.bottleCapacityMl} mL
                            </div>
                        </div>
                        <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100">
                            <div className="flex items-center text-sm font-medium text-textMuted mb-2">
                                <Activity className="h-5 w-5 mr-2 text-primary-500" />
                                Current Rate
                            </div>
                            <div className="text-3xl font-bold text-slate-800">
                                {bed.dropRatePerMinute} <span className="text-lg font-medium text-slate-500">drops/min</span>
                            </div>
                            <div className="text-sm font-medium text-slate-500 mt-1 capitalize">
                                Flow: {bed.flowStatus}
                            </div>
                        </div>
                        <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100">
                            <div className="flex items-center text-sm font-medium text-textMuted mb-2">
                                <Clock className="h-5 w-5 mr-2 text-primary-500" />
                                Est. Completion
                            </div>
                            <div className="text-3xl font-bold text-slate-800">
                                {bed.estimatedMinutesRemaining === null
                                    ? <span className="text-xl text-slate-400 font-medium">Waiting for data</span>
                                    : bed.estimatedMinutesRemaining > 60
                                        ? `${Math.floor(bed.estimatedMinutesRemaining / 60)}h ${bed.estimatedMinutesRemaining % 60}m`
                                        : `${bed.estimatedMinutesRemaining}m`}
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Volume Over Time (Estimated)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={volumeData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 600]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="volume" name="Volume (mL)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Drop Rate Tracking</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dropRateData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 'dataMax + 10']} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="stepAfter" dataKey="rate" name="Rate (drops/min)" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PatientDetails;
