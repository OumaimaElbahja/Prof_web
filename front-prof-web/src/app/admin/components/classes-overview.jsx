import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


export function ClassesOverview({ className }) {
    const classes = [
        {
            id: 1,
            name: "Introduction to Computer Science",
            code: "CS101",
            students: 42,
            progress: 65,
            nextClass: "Today, 10:00 AM",
        },
        {
            id: 2,
            name: "Data Structures and Algorithms",
            code: "CS201",
            students: 36,
            progress: 48,
            nextClass: "Tomorrow, 2:00 PM",
        },
        {
            id: 3,
            name: "Database Systems",
            code: "CS301",
            students: 28,
            progress: 72,
            nextClass: "Wednesday, 11:00 AM",
        },
        {
            id: 4,
            name: "Machine Learning",
            code: "CS401",
            students: 22,
            progress: 30,
            nextClass: "Thursday, 9:00 AM",
        },
    ]

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Active Classes</CardTitle>
                <CardDescription>Overview of your current classes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {classes.map((cls) => (
                        <div key={cls.id} className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{cls.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {cls.code} • {cls.students} students
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">{cls.nextClass}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Progress value={cls.progress} className="h-2" />
                                <span className="text-sm text-muted-foreground">{cls.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

