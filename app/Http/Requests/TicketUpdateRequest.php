<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TicketUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:180'],
            'description' => ['nullable', 'string'],
            'studio' => ['sometimes', 'string', 'max:50'],
            'showtime' => ['sometimes', 'date'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'poster_url' => ['nullable', 'url'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
