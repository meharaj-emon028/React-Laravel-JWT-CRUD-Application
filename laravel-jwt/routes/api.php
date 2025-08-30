<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;

// ----------------- Public Auth Routes -----------------c
Route::group(['prefix' => 'auth'], function() {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

// ----------------- Protected Auth Routes -----------------
    Route::prefix('auth')->middleware('jwt.auth')->group(function () {
    Route::post('/me',      [AuthController::class, 'me']);
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});
});

// ----------------- Protected Product & Order Routes -----------------
Route::middleware('jwt.auth')->group(function () {
    // Products CRUD
    Route::apiResource('products', ProductController::class);
    // Route::get('/products', [ProductController::class, 'index']);
    // Route::post('/products', [ProductController::class, 'store']);
    // Route::get('/products/{id}', [ProductController::class, 'show']);
    // Route::put('/products/{id}', [ProductController::class, 'update']);
    // Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Orders CRUD
    Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show']);
    // Route::get('/orders', [OrderController::class, 'index']);
    // Route::post('/orders', [OrderController::class, 'store']);
    // Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus']);
});

//Add a Dashboard API in Laravel for stat
Route::get('/dashboard/stats', function () {
    return response()->json([
        'total_products' => \App\Models\Product::count(),
        'total_orders' => \App\Models\Order::count(),
        'pending_orders' => \App\Models\Order::where('status', 'pending')->count(),
    ]);
});


