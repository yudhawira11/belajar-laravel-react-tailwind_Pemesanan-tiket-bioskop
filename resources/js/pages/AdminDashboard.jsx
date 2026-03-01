import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const initialForm = {
    title: '',
    description: '',
    studio: '',
    showtime: '',
    price: '',
    stock: '',
    poster_url: '',
    is_active: true,
};

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const isEditing = useMemo(() => editingId !== null, [editingId]);

    const fetchTickets = async () => {
        try {
            const response = await api.get('/admin/tickets');
            setTickets(response.data.data || []);
        } catch (err) {
            setError('Gagal memuat data tiket.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const payload = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            };

            if (isEditing) {
                await api.put(`/admin/tickets/${editingId}`, payload);
                setMessage('Tiket berhasil diperbarui.');
            } else {
                await api.post('/admin/tickets', payload);
                setMessage('Tiket baru berhasil dibuat.');
            }

            resetForm();
            await fetchTickets();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan tiket.');
        }
    };

    const startEdit = (ticket) => {
        setEditingId(ticket.id);
        setForm({
            title: ticket.title,
            description: ticket.description || '',
            studio: ticket.studio,
            showtime: ticket.showtime?.slice(0, 16) || '',
            price: ticket.price,
            stock: ticket.stock,
            poster_url: ticket.poster_url || '',
            is_active: ticket.is_active,
        });
    };

    const handleDelete = async (ticketId) => {
        if (!window.confirm('Hapus tiket ini?')) return;
        setError(null);
        setMessage(null);

        try {
            await api.delete(`/admin/tickets/${ticketId}`);
            setMessage('Tiket berhasil dihapus.');
            await fetchTickets();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menghapus tiket.');
        }
    };

    return (
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Admin</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Kelola tiket bioskop dan update jadwal terbaru.
                    </p>
                </div>

                {loading && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Memuat tiket...
                    </div>
                )}

                {!loading && tickets.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Belum ada tiket.
                    </div>
                )}

                <div className="grid gap-4">
                    {tickets.map((ticket) => (
                        <article
                            key={ticket.id}
                            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_20px_40px_-35px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                        {ticket.studio} • {ticket.showtime?.slice(0, 10)}
                                    </p>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{ticket.title}</h2>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        Rp {Number(ticket.price).toLocaleString('id-ID')} • {ticket.stock} kursi
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            ticket.is_active
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200'
                                                : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                        }`}
                                    >
                                        {ticket.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => startEdit(ticket)}
                                        className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(ticket.id)}
                                        className="rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-500 hover:text-rose-700 dark:border-rose-900 dark:text-rose-200 dark:hover:border-rose-500"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-900/70">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isEditing ? 'Edit Tiket' : 'Tambah Tiket'}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Lengkapi detail film dan jadwal penayangan.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Judul
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                    </label>

                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Deskripsi
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Studio
                            <input
                                type="text"
                                name="studio"
                                value={form.studio}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </label>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Showtime
                            <input
                                type="datetime-local"
                                name="showtime"
                                value={form.showtime}
                                onChange={handleChange}
                                required
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Harga
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </label>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Stok Kursi
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                        </label>
                    </div>

                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Poster URL
                        <input
                            type="url"
                            name="poster_url"
                            value={form.poster_url}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
                        Aktifkan tiket di halaman publik
                    </label>

                    {error && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-200">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                            {message}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                        >
                            {isEditing ? 'Simpan Perubahan' : 'Tambah Tiket'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                            >
                                Batal
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AdminDashboard;
