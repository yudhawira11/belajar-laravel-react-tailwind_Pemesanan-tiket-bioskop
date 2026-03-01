import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                setOrders(response.data.data || []);
            } catch (err) {
                setError('Gagal memuat pesanan.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pesanan Saya</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    Riwayat pembelian tiketmu dan status terbaru.
                </p>
            </div>

            {loading && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    Memuat pesanan...
                </div>
            )}

            {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200">
                    {error}
                </div>
            )}

            {!loading && !error && orders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    Belum ada pesanan.
                </div>
            )}

            <div className="grid gap-4">
                {orders.map((order) => (
                    <article
                        key={order.id}
                        className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_20px_40px_-35px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                    {formatDate(order.created_at)}
                                </p>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {order.ticket?.title || 'Tiket'}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {order.ticket?.studio} • {order.ticket?.showtime ? formatDate(order.ticket.showtime) : '-'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs uppercase text-slate-400 dark:text-slate-500">Total</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    Rp {order.total_price.toLocaleString('id-ID')}
                                </p>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                                    {order.status}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Orders;
