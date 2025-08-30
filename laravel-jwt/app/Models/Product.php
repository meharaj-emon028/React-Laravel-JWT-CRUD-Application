<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'sku', 'price', 'stock', 'description'];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
