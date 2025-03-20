"use client"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  MoreHorizontal,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Sample course data
const course = {
  id: 1,
  title: "Introduction to Biology",
  description: "Fundamentals of biology for 9th grade students",
  students: 28,
  lastActive: "Today",
  status: "active",
  thumbnail: "/placeholder.svg?height=200&width=800",
  modules: [
    {
      id: 1,
      title: "Cell Structure and Function",
      lessons: 4,
      assignments: 2,
      quizzes: 1,
      completed: true,
    },
    {
      id: 2,
      title: "Genetics and Heredity",
      lessons: 5,
      assignments: 3,
      quizzes: 2,
      completed: false,
    },
    {
      id: 3,
      title: "Ecosystems and Biodiversity",
      lessons: 3,
      assignments: 2,
      quizzes: 1,
      completed: false,
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Field Trip Next Week",
      date: "2 days ago",
      content: "We'll be visiting the Natural History Museum next Friday. Permission slips due by Wednesday.",
    },
    {
      id: 2,
      title: "Midterm Exam Schedule",
      date: "1 week ago",
      content: "The midterm exam will cover chapters 1-5 and will be held on October 15th.",
    },
  ],
  upcomingAssignments: [
    {
      id: 1,
      title: "Lab Report: Cell Observation",
      dueDate: "Tomorrow, 11:59 PM",
      status: "pending",
    },
    {
      id: 2,
      title: "Genetics Problem Set",
      dueDate: "Oct 12, 11:59 PM",
      status: "pending",
    },
  ],
}

export default function CourseDetailPage({ params }) {
  const router = useRouter()
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild onClick={() => router.back()}>

            <ArrowLeft className="h-4 w-4" />
            {/* <span className="sr-only">Back to Courses</span> */}

          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Course</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Course</DropdownMenuItem>
              <DropdownMenuItem>Archive Course</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Course</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <div className="aspect-[3/1] w-full overflow-hidden bg-muted">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{course.students}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{course.modules.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Course Modules</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </div>

          <div className="grid gap-4">
            {course.modules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{module.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Module</DropdownMenuItem>
                        <DropdownMenuItem>Add Lesson</DropdownMenuItem>
                        <DropdownMenuItem>Add Assignment</DropdownMenuItem>
                        <DropdownMenuItem>Add Quiz</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                      <BookOpen className="h-5 w-5 mb-1 text-primary" />
                      <span className="font-medium">{module.lessons}</span>
                      <span className="text-muted-foreground">Lessons</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                      <FileText className="h-5 w-5 mb-1 text-primary" />
                      <span className="font-medium">{module.assignments}</span>
                      <span className="text-muted-foreground">Assignments</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 mb-1 text-primary" />
                      <span className="font-medium">{module.quizzes}</span>
                      <span className="text-muted-foreground">Quizzes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>

          <div className="grid gap-4">
            {course.announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{announcement.title}</CardTitle>
                      <CardDescription>{announcement.date}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </div>

          <div className="grid gap-4">
            {course.upcomingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{assignment.title}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Students</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Students
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Roster</CardTitle>
              <CardDescription>Manage students enrolled in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Student management interface would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <CardTitle>Course Settings</CardTitle>
              </div>
              <CardDescription>Manage course details and configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Course settings interface would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

