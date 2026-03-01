<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TicketStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string'],
            'studio' => ['required', 'string', 'max:50'],
            'showtime' => ['required', 'date'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'poster_url' => ['nullable', 'url'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
