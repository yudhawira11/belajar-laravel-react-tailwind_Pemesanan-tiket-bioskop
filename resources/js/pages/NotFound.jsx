import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Halaman Tidak Ditemukan</h1>
            <p className="text-sm">URL yang kamu kunjungi tidak tersedia.</p>
            <Link
                to="/"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFound;
