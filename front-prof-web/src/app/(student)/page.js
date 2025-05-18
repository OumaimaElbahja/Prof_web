
import Link from "next/link"
import { CalendarDays, BookOpen, FileText, MessageSquare, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ui/mode_toggle"

export default function StudentDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord étudiant</h1>
        <div className="space-x-2 ">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
        </div>
        
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours actifs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
          <CardFooter>
            <Link href="/courses" className="text-xs text-blue-500 hover:underline">
              Voir tous les cours
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devoirs à rendre</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
          <CardFooter>
            <Link href="/assignments" className="text-xs text-blue-500 hover:underline">
              Voir tous les devoirs
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
          <CardFooter>
            <Link href="/forum" className="text-xs text-blue-500 hover:underline">
              Aller au forum
            </Link>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">Prochains devoirs</h2>
      <div className="space-y-4">
        {[
          { id: 1, course: "Mathématiques", title: "Exercices d'algèbre", due: "Demain, 23:59" },
          { id: 2, course: "Physique", title: "Rapport de laboratoire", due: "Jeudi, 12:00" },
          { id: 3, course: "Informatique", title: "Projet de programmation", due: "Vendredi, 18:00" },
        ].map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{assignment.title}</CardTitle>
                <Badge variant="outline">{assignment.course}</Badge>
              </div>
              <CardDescription className="flex items-center mt-1">
                <CalendarDays className="h-3 w-3 mr-1" />À rendre: {assignment.due}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/assignments/${assignment.id}`}>
                <Button variant="outline" size="sm">
                  Voir le devoir
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Cours récents</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { id: 1, title: "Mathématiques", teacher: "Prof. Dupont", updates: 2 },
          { id: 2, title: "Physique", teacher: "Prof. Martin", updates: 1 },
          { id: 3, title: "Informatique", teacher: "Prof. Bernard", updates: 3 },
        ].map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.teacher}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">{course.updates} nouvelle(s) publication(s)</CardContent>
            <CardFooter>
              <Link href={`/courses/${course.id}`}>
                <Button variant="outline" size="sm">
                  Accéder au cours
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

