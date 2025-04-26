<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $fillable = [
        'title',
        'description',
        'access_code',
        'syllabus',
    ];

    public function addResource(array $data)
    {
        return $this->resource()->create($data);
    }

    public function publishAnnouncement()
    {
        
    }

    public function createAssignment()
    {
        
    }
}

