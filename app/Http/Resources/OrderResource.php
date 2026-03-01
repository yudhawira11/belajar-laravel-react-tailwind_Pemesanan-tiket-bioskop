<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'total_price' => (float) $this->total_price,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'ticket' => new TicketResource($this->whenLoaded('ticket')),
        ];
    }
}
