import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(date);
};

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data.data);
            } catch (err) {
                setError('Tiket tidak ditemukan.');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    const totalPrice = useMemo(() => {
        if (!ticket) return 0;
        return ticket.price * quantity;
    }, [ticket, quantity]);

    const handleOrder = async () => {
        setError(null);
        setMessage(null);

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await api.post('/orders', {
                ticket_id: ticket.id,
                quantity,
            });
            setMessage('Pesanan berhasil dibuat. Tiket digitalmu sudah siap.');
            setTicket((prev) => ({
                ...prev,
                stock: prev.stock - response.data.data.quantity,
            }));
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memproses pesanan.');
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Memuat detail tiket...
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Tiket tidak ditemukan. <Link to="/" className="font-semibold underline">Kembali</Link>
            </div>
        );
    }

    return (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70">
                <div className="h-64">
                    <img
                        src={ticket.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
                        alt={ticket.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-4 p-8">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        <span>{ticket.studio}</span>
                        <span>{ticket.stock} kursi tersisa</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">{ticket.title}</h1>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{ticket.description}</p>
                    <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                        <div className="flex justify-between">
                            <span>Showtime</span>
                            <span className="font-semibold">{formatDate(ticket.showtime)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Harga</span>
                            <span className="font-semibold">Rp {ticket.price.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </section>

            <aside className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pesan Tiket</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Tentukan jumlah tiket dan lanjutkan proses pembelian.
                </p>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="text-xl font-bold text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        -
                    </button>
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.min(ticket.stock, prev + 1))}
                        className="text-xl font-bold text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        +
                    </button>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-white dark:bg-white dark:text-slate-900">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-200 dark:text-slate-600">Total</p>
                    <p className="text-2xl font-bold">Rp {totalPrice.toLocaleString('id-ID')}</p>
                </div>

                {error && (
                    <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                        {message}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleOrder}
                    disabled={ticket.stock === 0}
                    className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                    {ticket.stock === 0 ? 'Stok Habis' : 'Beli Sekarang'}
                </button>

                {!user && (
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                        Kamu perlu login untuk melanjutkan pembelian.
                    </p>
                )}
            </aside>
        </div>
    );
};

export default TicketDetail;
