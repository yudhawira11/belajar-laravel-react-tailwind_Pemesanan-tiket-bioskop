import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const NavItem = ({ to, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`
        }
    >
        {children}
    </NavLink>
);

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm uppercase tracking-widest text-white dark:bg-white dark:text-slate-900">
                        BX
                    </span>
                    BioskopX
                </Link>
                <nav className="flex flex-wrap items-center gap-2">
                    <NavItem to="/">Tiket</NavItem>
                    {user && <NavItem to="/orders">Pesanan</NavItem>}
                    {isAdmin && <NavItem to="/admin">Dashboard</NavItem>}
                    {!user && <NavItem to="/login">Login</NavItem>}
                    {!user && <NavItem to="/register">Signup</NavItem>}
                    {user && (
                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                        >
                            Logout
                        </button>
                    )}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
