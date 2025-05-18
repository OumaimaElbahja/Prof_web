"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit, FileText, Link as LinkIcon, ImageIcon, MoreHorizontal, Search, Trash2, Video } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const ITEMS_PER_PAGE = 9 // Adjust this value as needed

export function CourseList({ courses, onEdit, onDelete }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [displayedCourses, setDisplayedCourses] = useState([])
    const observer = useRef(null)
    const lastCourseElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [hasMore],
    )

    useEffect(() => {
        const filteredCourses = courses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.acces_code.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || course.status.toLowerCase() === statusFilter.toLowerCase()

            return matchesSearch && matchesStatus
        })

        const newDisplayedCourses = filteredCourses.slice(0, page * ITEMS_PER_PAGE)
        setDisplayedCourses(newDisplayedCourses)
        setHasMore(newDisplayedCourses.length < filteredCourses.length)
    }, [courses, searchTerm, statusFilter, page])

    const getResourceIcon = (type) => {
        switch (type) {
            case "pdf":
                return <FileText className="h-4 w-4" />
            case "video":
                return <Video className="h-4 w-4" />
            case "image":
                return <ImageIcon className="h-4 w-4" />
            case "link":
                return <LinkIcon className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6 p-5 md:p-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPage(1) // Reset page when search term changes
                        }}
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                        setStatusFilter(value)
                        setPage(1) // Reset page when filter changes
                    }}
                >
                    <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {displayedCourses.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No courses found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedCourses.map((course, index) => (
                        <Card
                            key={course.id}
                            className="flex flex-col h-full"
                            ref={index === displayedCourses.length - 1 ? lastCourseElementRef : null}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant={course.status === "Active" ? "default" : "secondary"} className="mb-2">
                                            {course.status}
                                        </Badge>
                                        <CardTitle className="text-xl">{course.title}</CardTitle>
                                        <CardDescription className="mt-1 font-medium">
                                            {course.acces_code} • {course.credits} credits
                                        </CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onEdit(course)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onDelete(course.id)}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                                <div className="text-sm">
                                    <p className="font-medium">Schedule:</p>
                                    <p className="text-muted-foreground">{course.schedule}</p>
                                </div>
                                <div className="text-sm mt-2">
                                    <p className="font-medium">Enrollment:</p>
                                    <p className="text-muted-foreground">
                                        {course.enrollment}/{course.maxEnrollment} students
                                    </p>
                                </div>

                                {course.resources.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-medium text-sm mb-2">Resources:</p>
                                        <div className="space-y-2">
                                            {course.resources.map((resource) => (
                                                <a
                                                    key={resource.id}
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted transition-colors"
                                                >
                                                    {getResourceIcon(resource.type)}
                                                    <span>{resource.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className=" px-6 py-2">
                                <div className="flex justify-between items-center w-full">
                                    <Badge variant={course.status === "active" ? "default" : "secondary"}>
                                        {course.status === "active" ? "Active" : "Archived"}
                                    </Badge>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/courses/${course.id}`}>
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Open Course
                                        </Link>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card >
                    ))}
                </div >
            )}
            {
                hasMore && (
                    <div className="flex items-center p-8 rounded-lg opacity-100 justify-center gap-2">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-3 w-3 rounded-full bg-primary"
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: [0, 10, -10, 0],
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                )
            }
        </div >
    )
}

