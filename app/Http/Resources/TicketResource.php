<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'studio' => $this->studio,
            'showtime' => optional($this->showtime)->toISOString(),
            'price' => (float) $this->price,
            'stock' => $this->stock,
            'poster_url' => $this->poster_url,
            'is_active' => (bool) $this->is_active,
        ];
    }
}
