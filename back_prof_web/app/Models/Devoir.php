<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devoir extends Model
{
    protected $fillable = [
        'cours_id',
        'titre',
        'description',
        'date_limite',
        'instructions',
        'piece_jointe',
    ];
}

