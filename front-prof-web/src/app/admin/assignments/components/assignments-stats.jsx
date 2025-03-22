import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, AlertTriangle } from "lucide-react"

export function AssignmentsStats() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                            <h3 className="text-2xl font-bold">24</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Graded</p>
                            <h3 className="text-2xl font-bold">14</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                            <Clock className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending</p>
                            <h3 className="text-2xl font-bold">8</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Late Submissions</p>
                            <h3 className="text-2xl font-bold">6</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

