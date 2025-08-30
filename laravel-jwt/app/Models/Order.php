<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{   
    use HasFactory;
    protected $fillable = ['user_id', 'total', 'status', 'placed_at'];
    protected $casts = ['placed_at' => 'datetime'];

    /**
     * Define relationship: One Order has many OrderItems.
     * Example: $order->items will return all items belonging to the order.
     */

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

     /**
     * Define relationship: Each Order belongs to a User.
     * Example: $order->user will return the user who placed the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
