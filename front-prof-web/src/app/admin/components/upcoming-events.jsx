import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"

export function UpcomingEvents() {
    const events = [
        {
            id: 1,
            title: "Office Hours",
            date: "Today",
            time: "3:00 PM - 5:00 PM",
            location: "Room 302",
        },
        {
            id: 2,
            title: "Department Meeting",
            date: "Tomorrow",
            time: "10:00 AM - 11:30 AM",
            location: "Conference Room B",
        },
        {
            id: 3,
            title: "CS201 Midterm",
            date: "Mar 26, 2025",
            time: "2:00 PM - 4:00 PM",
            location: "Lecture Hall 1",
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                {event.title.includes("Office") ? (
                                    <Users className="h-5 w-5 text-primary" />
                                ) : event.title.includes("Meeting") ? (
                                    <Clock className="h-5 w-5 text-primary" />
                                ) : (
                                    <Calendar className="h-5 w-5 text-primary" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-muted-foreground">
                                    {event.date} • {event.time}
                                </div>
                                <div className="text-sm text-muted-foreground">{event.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

