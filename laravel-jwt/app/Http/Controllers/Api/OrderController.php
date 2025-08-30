<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // List all orders of the authenticated user with their items and products
    public function index(Request $request)
    {
        return Order::with('items.product')             // eager load order items and their products
            ->where('user_id', $request->user()->id)     // filter orders for current user
            ->orderBy('id', 'desc')->get();                // latest orders first
    }

    // Show a single order with its items and products after authorization
    public function show($id)
    {
        $order = Order::with('items.product')->find($id);

        if(!$order){
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order, 200);
    }

    // Create a new order with multiple items inside a transaction
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',      // order must have at least 1 item
            'items.*.product_id' => 'required|exists:products,id',   // each item must reference a valid product
            'items.*.quantity' => 'required|integer|min:1',    // quantity must be integer >= 1
        ]);

        return DB::transaction(function () use ($request){
            $order = Order::create([         // create order record
                'user_id' => $request->user()->id,
                'status' => 'pending',
                'total' => 0,
                'placed_at' => now(),
            ]);

            $total = 0;
            foreach($request->items as $item){
                $product = Product::findOrFail($item['product_id']);  

                if($product->stock < $item['quantity']){                                // check stock
                    abort(400, "Insufficient stock for {$product->name}");
                }

                $product->decrement('stock', $item['quantity']);   // reduce product stock
                $subtotal = $product->price * $item['quantity'];  //subtotal
                $total += $subtotal;

                OrderItem::create([             // create order item
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ]);
            }

            $order->update(['total' => $total]);        // update order total
            return $order->load('items.product');       // return order with items
        });
    }

    // Update the status of an order (pending, paid, shipped, cancelled)
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate(['status' => 'required|in:pending,paid,shipped,cancelled']);
        $order->status = $validated['status'];     // validate status
        $order->save(); 
        
        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order
        ], 200);
    }

    // Check if the authenticated user owns the order
    // public function authorizeOrder(Order $order, Request $request)
    // {
    //     abort_if($order->user_id !== $request->user()->id, 403, 'Forbidden');    // abort if unauthorized
    // }
}
