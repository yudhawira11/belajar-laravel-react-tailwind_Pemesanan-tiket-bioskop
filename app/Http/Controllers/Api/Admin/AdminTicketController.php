<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TicketStoreRequest;
use App\Http\Requests\TicketUpdateRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;

class AdminTicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::query()
            ->orderByDesc('created_at')
            ->paginate(20);

        return TicketResource::collection($tickets);
    }

    public function store(TicketStoreRequest $request)
    {
        $ticket = Ticket::create($request->validated());

        return new TicketResource($ticket);
    }

    public function update(TicketUpdateRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return new TicketResource($ticket);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json(['message' => 'Tiket berhasil dihapus.']);
    }
}
