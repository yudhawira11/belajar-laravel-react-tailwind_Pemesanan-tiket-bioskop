import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
};

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get('/tickets');
                setTickets(response.data.data || []);
            } catch (err) {
                setError('Gagal memuat tiket. Coba lagi nanti.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="flex flex-col gap-12">
            <section className="rounded-3xl border border-white/70 bg-white/70 p-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60">
                <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                            BioskopX Experience
                        </p>
                        <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 dark:text-white md:text-5xl">
                            Beli tiket bioskop dalam hitungan menit, tanpa antre.
                        </h1>
                        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                            Temukan jadwal terbaru, pilih studio favorit, dan amankan kursi terbaikmu dengan proses checkout
                            yang ringan dan aman.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                                Update Jadwal Real-time
                            </span>
                            <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                                Pembayaran Aman
                            </span>
                            <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                                Tiket Digital
                            </span>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Highlight Hari Ini</p>
                        <h2 className="mt-4 text-2xl font-bold">Prime Screening</h2>
                        <p className="mt-2 text-sm text-slate-200">
                            Studio utama dengan audio surround 7.1 dan layar IMAX untuk pengalaman sinematik penuh.
                        </p>
                        <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                            <div>
                                <p className="text-xs uppercase text-slate-300">Mulai</p>
                                <p className="text-lg font-bold">Rp 40.000</p>
                            </div>
                            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900">
                                Jadwal Baru
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tiket Tersedia</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Pilih film dan jadwal terbaik untuk pengalaman nontonmu.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Memuat daftar tiket...
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200">
                        {error}
                    </div>
                )}

                {!loading && !error && tickets.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Belum ada tiket yang aktif.
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {tickets.map((ticket) => (
                        <article
                            key={ticket.id}
                            className="group flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 dark:border-slate-800/80 dark:bg-slate-900/70"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={ticket.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
                                    alt={ticket.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-4 p-6">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    <span>{ticket.studio}</span>
                                    <span>{ticket.stock} kursi</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ticket.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{ticket.description}</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase text-slate-400 dark:text-slate-500">Showtime</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                            {formatDate(ticket.showtime)}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/tickets/${ticket.id}`}
                                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
