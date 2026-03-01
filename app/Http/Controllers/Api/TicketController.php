<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = Ticket::query()
            ->where('is_active', true)
            ->orderBy('showtime')
            ->paginate(12);

        return TicketResource::collection($tickets);
    }

    public function show(Ticket $ticket)
    {
        if (! $ticket->is_active) {
            return response()->json(['message' => 'Tiket tidak tersedia.'], 404);
        }

        return new TicketResource($ticket);
    }
}
