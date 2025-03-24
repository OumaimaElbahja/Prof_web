"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Edit, Trash, FileText, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"


export function AssignmentsTable() {
    const [assignments] = useState([
        {
            id: "1",
            title: "Introduction to Programming Concepts",
            course: "CS101",
            type: "Quiz",
            dueDate: "Mar 25, 2025",
            status: "Graded",
            submissions: 42,
            totalStudents: 42,
            points: 20,
            weight: 5,
        },
        {
            id: "2",
            title: "Variables and Data Types",
            course: "CS101",
            type: "Homework",
            dueDate: "Mar 28, 2025",
            status: "Open",
            submissions: 35,
            totalStudents: 42,
            points: 50,
            weight: 10,
        },
        {
            id: "3",
            title: "Control Structures Lab",
            course: "CS101",
            type: "Lab",
            dueDate: "Apr 2, 2025",
            status: "Open",
            submissions: 28,
            totalStudents: 42,
            points: 30,
            weight: 5,
        },
        {
            id: "4",
            title: "Data Structures Implementation",
            course: "CS201",
            type: "Project",
            dueDate: "Apr 10, 2025",
            status: "Open",
            submissions: 20,
            totalStudents: 36,
            points: 100,
            weight: 15,
        },
        {
            id: "5",
            title: "Algorithm Analysis",
            course: "CS201",
            type: "Homework",
            dueDate: "Apr 5, 2025",
            status: "Grading",
            submissions: 36,
            totalStudents: 36,
            points: 50,
            weight: 10,
        },
        {
            id: "6",
            title: "Database Design Project",
            course: "CS301",
            type: "Project",
            dueDate: "Apr 15, 2025",
            status: "Published",
            submissions: 0,
            totalStudents: 28,
            points: 150,
            weight: 20,
        },
        {
            id: "7",
            title: "SQL Queries",
            course: "CS301",
            type: "Lab",
            dueDate: "Apr 8, 2025",
            status: "Open",
            submissions: 15,
            totalStudents: 28,
            points: 40,
            weight: 5,
        },
        {
            id: "8",
            title: "Machine Learning Midterm",
            course: "CS401",
            type: "Exam",
            dueDate: "Apr 12, 2025",
            status: "Draft",
            submissions: 0,
            totalStudents: 22,
            points: 200,
            weight: 25,
        },
    ])

    const [selectedAssignments, setSelectedAssignments] = useState([])

    const toggleSelectAll = () => {
        if (selectedAssignments.length === assignments.length) {
            setSelectedAssignments([])
        } else {
            setSelectedAssignments(assignments.map((assignment) => assignment.id))
        }
    }

    const toggleSelectAssignment = (id) => {
        if (selectedAssignments.includes(id)) {
            setSelectedAssignments(selectedAssignments.filter((assignmentId) => assignmentId !== id))
        } else {
            setSelectedAssignments([...selectedAssignments, id])
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Draft":
                return "bg-gray-500"
            case "Published":
                return "bg-blue-500"
            case "Open":
                return "bg-green-500"
            case "Closed":
                return "bg-red-500"
            case "Grading":
                return "bg-yellow-500"
            case "Graded":
                return "bg-purple-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusVariant = (status) => {
        switch (status) {
            case "Draft":
                return "secondary"
            case "Published":
                return "default"
            case "Open":
                return "outline"
            case "Closed":
                return "destructive"
            case "Grading":
                return "warning"
            case "Graded":
                return "success"
            default:
                return "secondary"
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "Quiz":
                return <FileText className="h-4 w-4" />
            case "Homework":
                return <FileText className="h-4 w-4" />
            case "Project":
                return <Users className="h-4 w-4" />
            case "Exam":
                return <Calendar className="h-4 w-4" />
            case "Lab":
                return <FileText className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={selectedAssignments.length === assignments.length && assignments.length > 0}
                                onCheckedChange={toggleSelectAll}
                                aria-label="Select all"
                            />
                        </TableHead>
                        <TableHead className="min-w-[250px]">Assignment</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedAssignments.includes(assignment.id)}
                                    onCheckedChange={() => toggleSelectAssignment(assignment.id)}
                                    aria-label={`Select ${assignment.title}`}
                                />
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium">{assignment.title}</div>
                                    <div className="text-sm text-muted-foreground">{assignment.course}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {getTypeIcon(assignment.type)}
                                    <span>{assignment.type}</span>
                                </div>
                            </TableCell>
                            <TableCell>{assignment.dueDate}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(assignment.status)}>{assignment.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Progress
                                        value={(assignment.submissions / assignment.totalStudents) * 100}
                                        className="h-2 w-[60px]"
                                    />
                                    <span className="text-sm">
                                        {assignment.submissions}/{assignment.totalStudents}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{assignment.points} pts</span>
                                    <span className="text-xs text-muted-foreground">{assignment.weight}% of grade</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Assignment
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete Assignment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

