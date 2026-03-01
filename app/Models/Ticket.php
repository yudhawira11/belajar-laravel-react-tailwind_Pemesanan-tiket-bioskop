<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'studio',
        'showtime',
        'price',
        'stock',
        'poster_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'showtime' => 'datetime',
            'price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
}
