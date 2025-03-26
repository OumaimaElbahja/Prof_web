<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devoir extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_id',
        'titre',
        'description',
        'date_limite',
        'instructions',
        'piece_jointe',
    ];
}
