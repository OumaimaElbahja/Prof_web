"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CourseDialog } from "./components/course-dialog";
import { CourseList } from "./components/course-list";

export default function ProfessorBackoffice() {
  const [courses, setCourses] = useState([
    {
      id: "1",
      acces_code: "CS101",
      title: "Introduction to Computer Science",
      description: "A foundational course covering basic programming concepts.",
      schedule: "Mon, Wed 10:00 - 11:30 AM",
      credits: 3,
      enrollment: 45,
      maxEnrollment: 50,
      status: "Active",
      resources: [
        {
          id: "r1",
          type: "pdf",
          title: "Introduction to Programming",
          url: "/resources/intro-programming.pdf",
        },
        {
          id: "r2",
          type: "video",
          title: "Algorithms Basics",
          url: "https://example.com/videos/algorithms-basics",
        },
      ],
    },
    {
      id: "2",
      acces_code: "CS201",
      title: "Data Structures and Algorithms",
      description: "Advanced programming concepts focusing on data structures.",
      schedule: "Tue, Thu 1:00 - 2:30 PM",
      credits: 4,
      enrollment: 32,
      maxEnrollment: 40,
      status: "Active",
      resources: [
        {
          id: "r3",
          type: "pdf",
          title: "Data Structures Guide",
          url: "/resources/data-structures.pdf",
        },
        {
          id: "r4",
          type: "image",
          title: "Algorithm Flowcharts",
          url: "/resources/algorithm-flowcharts.png",
        },
      ],
    },
    {
      id: "3",
      acces_code: "CS301",
      title: "Database Systems",
      description: "Introduction to database design and SQL.",
      schedule: "Fri 9:00 AM - 12:00 PM",
      credits: 3,
      enrollment: 28,
      maxEnrollment: 35,
      status: "Inactive",
      resources: [
        {
          id: "r5",
          type: "link",
          title: "SQL Tutorial",
          url: "https://example.com/sql-tutorial",
        },
      ],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleAddCourse = (course) => {
    const newCourse = {
      ...course,
      id: (courses.length + 1).toString(),
      resources: course.resources || [],
      enrollment: 0,
      status: "Active",
    };
    setCourses([...courses, newCourse]);
  };

  const handleEditCourse = (course) => {
    setCourses(courses.map((c) => (c.id === course.id ? course : c)));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const openAddDialog = () => {
    setEditingCourse(null);
    setOpen(true);
  };

  const openEditDialog = (course) => {
    setEditingCourse(course);
    setOpen(true);
  };

  return (
    <div className="container mx-auto h-full py-8">
      <div className="md:p-0 p-4 flex items-center justify-between  mb-1 md:mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage your courses and student enrollments
          </p>
        </div>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <CourseList
        courses={courses}
        onEdit={openEditDialog}
        onDelete={handleDeleteCourse}
      />

      <CourseDialog
        open={open}
        onOpenChange={setOpen}
        onSave={editingCourse ? handleEditCourse : handleAddCourse}
        course={editingCourse}
      />
    </div>
  );
}
