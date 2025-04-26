<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseController extends Controller
{   
    public function index()
    {
        return Course::all();
    }

    public function store(Request $request)
    {
        $course = Course::create($request->only(['title', 'description', 'access_code', 'syllabus']));
        return response()->json($course, 201);
    }

    public function show($id)
    {
        return Course::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->only(['title', 'description', 'access_code', 'syllabus']));
        return response()->json($course);
    }

    public function destroy($id)
    {
        Course::destroy($id);
        return response()->json(null, 204);
    }

    public function addResource($id)
    {
        $course = Course::findOrFail($id);
        $course->addResource();
        return response()->json(['message' => 'Resource added']);
    }

    public function publishAnnouncement($id)
    {
        $course = Course::findOrFail($id);
        $course->publishAnnouncement();
        return response()->json(['message' => 'Announcement published']);
    }

    public function createAssignment($id)
    {
        $course = Course::findOrFail($id);
        $course->createAssignment();
        return response()->json(['message' => 'Assignment created']);
    }
}
