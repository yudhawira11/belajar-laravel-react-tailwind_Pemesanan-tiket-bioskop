<?php

use App\Http\Controllers\Api\Admin\AdminTicketController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::get('tickets', [TicketController::class, 'index']);
Route::get('tickets/{ticket}', [TicketController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);

    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('tickets', [AdminTicketController::class, 'index']);
        Route::post('tickets', [AdminTicketController::class, 'store']);
        Route::put('tickets/{ticket}', [AdminTicketController::class, 'update']);
        Route::delete('tickets/{ticket}', [AdminTicketController::class, 'destroy']);
    });
});
