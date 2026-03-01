<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Bioskop',
            'email' => 'admin@bioskop.test',
            'password' => Hash::make('admin12345'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'User Demo',
            'email' => 'user@bioskop.test',
            'password' => Hash::make('user12345'),
            'role' => 'user',
        ]);

        Ticket::query()->create([
            'title' => 'Galaksi Senja',
            'description' => 'Petualangan epik di planet jauh dengan visual memukau.',
            'studio' => 'Studio 1',
            'showtime' => now()->addDays(1)->setTime(19, 30),
            'price' => 45000,
            'stock' => 80,
            'poster_url' => 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
            'is_active' => true,
        ]);

        Ticket::query()->create([
            'title' => 'Lautan Malam',
            'description' => 'Drama emosional tentang keluarga nelayan di pesisir.',
            'studio' => 'Studio 2',
            'showtime' => now()->addDays(2)->setTime(16, 0),
            'price' => 40000,
            'stock' => 120,
            'poster_url' => 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d',
            'is_active' => true,
        ]);

        Ticket::query()->create([
            'title' => 'Kereta Kota',
            'description' => 'Aksi komedi di balik layar sistem transportasi modern.',
            'studio' => 'Studio 3',
            'showtime' => now()->addDays(3)->setTime(21, 15),
            'price' => 50000,
            'stock' => 60,
            'poster_url' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
            'is_active' => true,
        ]);
    }
}
