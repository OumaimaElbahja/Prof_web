import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StudentPerformance() {
    const performanceData = [
        {
            course: "CS101",
            avgGrade: 82,
            highestGrade: 98,
            lowestGrade: 65,
            atRisk: 4,
        },
        {
            course: "CS201",
            avgGrade: 78,
            highestGrade: 95,
            lowestGrade: 60,
            atRisk: 6,
        },
        {
            course: "CS301",
            avgGrade: 85,
            highestGrade: 97,
            lowestGrade: 72,
            atRisk: 2,
        },
        {
            course: "CS401",
            avgGrade: 76,
            highestGrade: 92,
            lowestGrade: 58,
            atRisk: 5,
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Grade distribution across courses</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {performanceData.map((data) => (
                        <div key={data.course} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{data.course}</div>
                                <div className="text-sm font-medium">Avg: {data.avgGrade}%</div>
                            </div>
                            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div className="bg-green-500" style={{ width: `${data.highestGrade - data.lowestGrade}%` }} />
                                <div className="bg-yellow-500" style={{ width: `${data.lowestGrade - 50}%` }} />
                                <div className="bg-red-500" style={{ width: `${Math.min(data.lowestGrade, 50)}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                    Range: {data.lowestGrade}% - {data.highestGrade}%
                                </span>
                                <span>{data.atRisk} students at risk</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

