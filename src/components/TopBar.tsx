import React from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';

const TopBar: React.FC = () => {
    return (
        <header className="h-16 bg-surface border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10 shadow-sm">
            <div className="flex items-center">
                <button className="mr-4 lg:hidden text-slate-500">
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-2 text-sm font-medium text-textMain cursor-pointer bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-md hover:bg-slate-100 transition-colors">
                    <span>Ward A</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="hidden sm:flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-success mr-2 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-600">System Online</span>
                </div>

                <div className="relative cursor-pointer">
                    <Bell className="h-5 w-5 text-slate-500 hover:text-textMain transition-colors" />
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-danger text-[9px] font-bold text-white flex items-center justify-center border-2 border-surface">
                        3
                    </span>
                </div>

                <div className="lg:hidden">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 font-bold">
                        K
                    </div>
                </div>
            </div>
        </header>
    );
};
export default TopBar;
