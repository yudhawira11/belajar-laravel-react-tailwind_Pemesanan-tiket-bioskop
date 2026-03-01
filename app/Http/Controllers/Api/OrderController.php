<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->with('ticket')
            ->where('user_id', auth()->id())
            ->orderByDesc('created_at')
            ->paginate(10);

        return OrderResource::collection($orders);
    }

    public function store(OrderStoreRequest $request)
    {
        $order = DB::transaction(function () use ($request) {
            $ticket = Ticket::query()
                ->lockForUpdate()
                ->findOrFail($request->integer('ticket_id'));

            $quantity = $request->integer('quantity');

            if ($ticket->stock < $quantity) {
                return null;
            }

            $ticket->decrement('stock', $quantity);

            return Order::create([
                'user_id' => $request->user()->id,
                'ticket_id' => $ticket->id,
                'quantity' => $quantity,
                'total_price' => $ticket->price * $quantity,
                'status' => 'paid',
            ]);
        });

        if (! $order) {
            return response()->json(['message' => 'Stok tiket tidak mencukupi.'], 422);
        }

        return new OrderResource($order->load('ticket'));
    }
}
