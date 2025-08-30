<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register -> return user + token
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = Auth::login($user);

        return response()->json(['message' => 'Successfully Register'], 201);
    }

    // Login -> return user + token
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'user'         => Auth::user(),
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => Auth::factory()->getTTL() * 60,
        ]);
    }

    // Current user
    public function me()
    {
        return response()->json(Auth::user());
    }

    // Logout (invalidate token)
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out']);
    }

    // Refresh token
    public function refresh()
    {
        return response()->json([
            'user'         => Auth::user(),
            'access_token' => Auth::refresh(),
            'token_type'   => 'bearer',
            'expires_in'   => Auth::factory()->getTTL() * 60,
        ]);
    }
}
