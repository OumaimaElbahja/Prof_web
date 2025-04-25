<?php
namespace App\Http\Controllers;

use App\Models\Devoir;
use Illuminate\Http\Request;

class DevoirController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cours_id' => 'required|integer|exists:cours,id',
            'titre' => 'required|string',
            'description' => 'nullable|string',
            'date_limite' => 'nullable|date',
            'instructions' => 'nullable|string',
            'piece_jointe' => 'nullable|string', // ou file si tu veux uploader
            'cours_id' => 'required|integer|exists:cours,id',
        ]);

        $devoir = Devoir::create($validated);

        return response()->json([
            'message' => 'Devoir ajouté avec succès',
            'data' => $devoir
        ], 201);
    }
}
