import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import ToastContainer from '../components/ToastContainer';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 font-medium pb-2 lg:pb-0">
                        IV-Sentinel is a monitoring-assistance prototype. Always verify the patient's IV and clinical condition physically.
                    </footer>
                </main>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Layout;
