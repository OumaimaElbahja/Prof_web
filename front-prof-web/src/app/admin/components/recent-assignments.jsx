import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentAssignments() {
    const assignments = [
        {
            id: 1,
            title: "Midterm Project",
            course: "CS201",
            dueDate: "Mar 25, 2025",
            status: "Grading",
            submissions: 32,
            total: 36,
        },
        {
            id: 2,
            title: "Lab Assignment 4",
            course: "CS101",
            dueDate: "Mar 28, 2025",
            status: "Open",
            submissions: 18,
            total: 42,
        },
        {
            id: 3,
            title: "Research Paper",
            course: "CS401",
            dueDate: "Apr 5, 2025",
            status: "Draft",
            submissions: 0,
            total: 22,
        },
        {
            id: 4,
            title: "Database Design",
            course: "CS301",
            dueDate: "Apr 10, 2025",
            status: "Draft",
            submissions: 0,
            total: 28,
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
                <CardDescription>Manage your assignments</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-start justify-between">
                            <div>
                                <div className="font-medium">{assignment.title}</div>
                                <div className="text-sm text-muted-foreground">
                                    {assignment.course} • Due {assignment.dueDate}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Badge
                                    variant={
                                        assignment.status === "Grading" ? "default" : assignment.status === "Open" ? "outline" : "secondary"
                                    }
                                >
                                    {assignment.status}
                                </Badge>
                                <div className="text-sm text-muted-foreground">
                                    {assignment.submissions}/{assignment.total} submitted
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

