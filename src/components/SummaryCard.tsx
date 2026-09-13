import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    colorClass: string;
    bgClass: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, colorClass, bgClass }) => {
    return (
        <div className="bg-surface rounded-xl p-5 shadow-card border border-slate-100 flex items-center">
            <div className={`p-4 rounded-lg ${bgClass} ${colorClass} mr-4`}>
                <Icon className="h-7 w-7" />
            </div>
            <div>
                <div className="text-3xl font-bold text-textMain tracking-tight mb-1">{value}</div>
                <div className="text-sm font-medium text-textMuted">{title}</div>
            </div>
        </div>
    );
};
export default SummaryCard;
