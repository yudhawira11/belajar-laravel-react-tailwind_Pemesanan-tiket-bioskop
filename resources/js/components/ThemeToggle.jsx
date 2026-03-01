import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
        >
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    );
};

export default ThemeToggle;
