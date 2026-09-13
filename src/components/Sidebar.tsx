import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, History, BarChart3, Settings, LogOut, UserCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Patients / Beds', path: '/patients', icon: Users },
        { name: 'History', path: '/history', icon: History },
        { name: 'Reports', path: '/reports', icon: BarChart3 },
        { name: 'Settings', path: '#', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-surface border-r border-slate-200 hidden lg:flex flex-col h-full shrink-0 shadow-sm z-20">
            <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
                <Activity className="h-7 w-7 text-primary-500 mr-2" />
                <span className="text-xl font-bold text-primary-900 tracking-tight">IV-SENTINEL</span>
            </div>

            <nav className="flex-1 py-6 overflow-y-auto">
                <ul className="space-y-1.5 px-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path) && item.path !== '#';
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary-50 text-primary-900'
                                        : 'text-textMuted hover:bg-slate-50 hover:text-textMain'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary-500' : 'text-slate-400'}`} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-100 shrink-0">
                <div className="flex items-center mb-4 px-2">
                    <UserCircle className="h-9 w-9 text-slate-300 mr-3" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-textMain leading-snug">Kavya R.</span>
                        <span className="text-xs text-textMuted">Senior Nurse</span>
                    </div>
                </div>
                <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-textMuted hover:text-danger transition-colors rounded-lg hover:bg-red-50">
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
};
export default Sidebar;
