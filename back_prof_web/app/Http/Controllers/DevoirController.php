<?php

namespace App\Http\Controllers;

use App\Models\Devoir;
use Illuminate\Http\Request;

class DevoirController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données envoyées par le frontend
        $request->validate([
            'cours_id' => 'required|exists:cours,id',
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_limite' => 'nullable|date',
            'instructions' => 'nullable|string',
            'piece_jointe' => 'nullable|string',
        ]);

        // Création du devoir
        $devoir = Devoir::create([
            'cours_id' => $request->cours_id,
            'titre' => $request->titre,
            'description' => $request->description,
            'date_limite' => $request->date_limite,
            'instructions' => $request->instructions,
            'piece_jointe' => $request->piece_jointe,
        ]);

        return response()->json(['message' => 'Devoir créé avec succès', 'data' => $devoir], 201);
    }
    public function index()
{
    // Récupérer tous les devoirs
    $devoirs = Devoir::all();

    return response()->json(['data' => $devoirs]);
}

}
