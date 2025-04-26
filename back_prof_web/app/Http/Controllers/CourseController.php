<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'access_code' => 'nullable|string|max:255',
            'syllabus' => 'nullable|string',
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    
    public function index()
    {
        $courses = Course::all();
        return response()->json($courses);
    }

    
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }

    
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'access_code' => 'nullable|string|max:255',
            'syllabus' => 'nullable|string',
        ]);

        $course = Course::findOrFail($id);
        $course->update($validated);

        return response()->json($course);
    }

    
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(null, 204);
    }
}
