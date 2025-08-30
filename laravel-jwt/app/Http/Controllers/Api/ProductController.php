<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Return all products ordered by newest first
    public function index(Request $request)
    {
        return response()->json($request->user()->products()->get());
    }

    // Store a new product after validating request data
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string'
        ]);

        $product = $request->user()->products()->create($request->all());
        return response()->json($product, 201);     // create product and return JSON with 201 status
    }

    // Show a single product by ID
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    // Update a product's details after validation
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
            'sku' => 'sometimes|string|unique:products,sku,' . $id,
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'description' => 'nullable|string'
        ]);

        $product->update($data);
        return response()->json($product, 200);
    }

    // Delete a product from database
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);     // return 204 No Content response
    }
}
