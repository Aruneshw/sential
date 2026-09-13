import React from 'react';
import { Bed } from '../types';
import { Clock, Droplets, AlertCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BedCardProps {
    bed: Bed;
}

const BedCard: React.FC<BedCardProps> = ({ bed }) => {
    const getStatusColors = (status: Bed['overallStatus']) => {
        switch (status) {
            case 'NORMAL': return 'bg-success border-success/20 text-white';
            case 'ATTENTION': return 'bg-warning border-warning/20 text-white';
            case 'CRITICAL': return 'bg-danger border-danger/20 text-white';
            case 'ACTION REQUIRED': return 'bg-info border-info/20 text-white';
            default: return 'bg-slate-500 border-slate-500/20 text-white';
        }
    };

    const getStatusGlow = (status: Bed['overallStatus']) => {
        switch (status) {
            case 'NORMAL': return '';
            case 'ATTENTION': return 'ring-2 ring-warning/30 border-warning/30';
            case 'CRITICAL': return 'ring-2 ring-danger/40 border-danger/30';
            case 'ACTION REQUIRED': return 'ring-2 ring-info/40 border-info/30';
            default: return '';
        }
    };

    const statusColors = getStatusColors(bed.overallStatus);
    const glow = getStatusGlow(bed.overallStatus);

    return (
        <div className={`bg-surface rounded-xl p-5 shadow-card border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col ${glow}`}>
            {bed.overallStatus !== 'NORMAL' && (
                <div className={`absolute top-0 left-0 w-full h-1 ${bed.overallStatus === 'CRITICAL' ? 'bg-danger' :
                    bed.overallStatus === 'ATTENTION' ? 'bg-warning' : 'bg-info'
                    }`} />
            )}

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-textMain">{bed.bedNumber}</h3>
                    <p className="text-sm text-textMuted font-medium">{bed.patientName} • {bed.fluidType}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold tracking-wide uppercase ${statusColors}`}>
                    {bed.overallStatus}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center text-xs text-textMuted mb-1">
                        <Droplets className="h-3.5 w-3.5 mr-1 text-primary-500" />
                        IV Remaining
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-xl font-bold text-primary-900 mr-2">{bed.remainingPercentage}%</span>
                        <span className="text-xs font-medium text-slate-500">{bed.remainingVolumeMl} mL</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                            className={`h-1.5 rounded-full transition-all duration-1000 ${bed.remainingPercentage > 50 ? 'bg-success' :
                                bed.remainingPercentage > 20 ? 'bg-warning' : 'bg-danger'
                                }`}
                            style={{ width: `${bed.remainingPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center text-xs text-textMuted mb-1">
                            <Clock className="h-3.5 w-3.5 mr-1 text-primary-500" />
                            ETA
                        </div>
                        <div className="text-xl font-bold text-slate-700">
                            {bed.estimatedMinutesRemaining === null
                                ? <span className="text-base text-slate-400 font-medium">Waiting for data</span>
                                : bed.estimatedMinutesRemaining > 60
                                    ? `${Math.floor(bed.estimatedMinutesRemaining / 60)}h ${bed.estimatedMinutesRemaining % 60}m`
                                    : `${bed.estimatedMinutesRemaining} min`}
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200">
                        <div className="flex items-center text-xs text-textMuted mb-0.5">
                            <Activity className="h-3 w-3 mr-1 text-primary-400" />
                            Flow Rate
                        </div>
                        <div className="text-sm font-bold text-slate-700 mb-1">
                            {bed.dropRatePerMinute} drops/min
                        </div>
                        <div className={`text-xs font-medium ${bed.flowStatus === 'abnormal' ? 'text-blue-600' : 'text-slate-500'} capitalize leading-tight`}>
                            Flow: {bed.flowStatus === 'abnormal' ? 'Possible flow abnormality' : bed.flowStatus}
                        </div>
                    </div>
                </div>
            </div>

            {bed.overallStatus === 'ACTION REQUIRED' && (
                <div className="bg-blue-50 text-blue-800 text-xs sm:text-sm p-3 rounded-lg flex items-start mb-4 border border-blue-100">
                    <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-blue-600" />
                    <span>Possible flow abnormality. Nurse verification required.</span>
                </div>
            )}

            <div className="mt-auto flex justify-between items-center pt-2">
                <div className="text-xs text-slate-400 font-medium flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-1.5 ${bed.deviceOnline ? 'bg-success' : 'bg-slate-300'}`}></div>
                    {bed.deviceOnline ? 'Connected' : 'Offline'}
                </div>
                <Link
                    to={`/patients/${bed.id}`}
                    className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors bg-primary-50 px-3 py-1.5 rounded-md"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};
export default BedCard;
