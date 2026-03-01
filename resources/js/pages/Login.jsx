import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', remember: true });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(form);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal login. Periksa data kamu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Selamat Datang</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Masuk untuk mengelola pesanan tiketmu.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                </label>

                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Password
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
                    Ingat saya
                </label>

                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                    {loading ? 'Memproses...' : 'Login'}
                </button>
            </form>

            <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                Belum punya akun?{' '}
                <Link to="/register" className="font-semibold text-slate-900 underline dark:text-white">
                    Daftar sekarang
                </Link>
            </p>
        </div>
    );
};

export default Login;
