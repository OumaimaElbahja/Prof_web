
import { ClassesOverview } from "./components/classes-overview";
import { UpcomingEvents } from "./components/upcoming-events";
import { RecentAssignments } from "./components/recent-assignments";
import { StudentPerformance } from "./components/student-performance";

export default function AdminDashboard({ user }) {

    return (
        <main className="flex-1 bg-muted/30">
            <div className="mx-auto max-w-7xl space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, Professor {user?.name || ""}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card p-4 shadow">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="text-muted-foreground">Active Classes</span>
                        </div>
                        <div className="mt-1 text-3xl font-bold">4</div>
                    </div>
                    <div className="rounded-xl border bg-card p-4 shadow">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="text-muted-foreground">Total Students</span>
                        </div>
                        <div className="mt-1 text-3xl font-bold">128</div>
                    </div>
                    <div className="rounded-xl border bg-card p-4 shadow">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="text-muted-foreground">Pending Assignments</span>
                        </div>
                        <div className="mt-1 text-3xl font-bold">12</div>
                    </div>
                    <div className="rounded-xl border bg-card p-4 shadow">
                        <div className="flex items-center gap-2 font-medium">
                            <span className="text-muted-foreground">Upcoming Events</span>
                        </div>
                        <div className="mt-1 text-3xl font-bold">3</div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <ClassesOverview className="lg:col-span-2" />
                    <UpcomingEvents />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <RecentAssignments />
                    <StudentPerformance />
                </div>
            </div>
        </main>
    );
}