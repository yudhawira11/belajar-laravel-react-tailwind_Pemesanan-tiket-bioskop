import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#e2e8f0_45%,_#cbd5f5_100%)] dark:bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_50%,_#0b1120_100%)]">
            <Navbar />
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
