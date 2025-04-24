import Link from "next/link"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function StudentCourses() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Mes cours</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Rechercher un cours..." className="w-full pl-8" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`} className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {course.hasNewContent && <Badge className="ml-2">Nouveau</Badge>}
                </div>
                <CardDescription>{course.teacher}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-sm text-muted-foreground">{course.description}</div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3">
                <div className="text-xs text-muted-foreground">{course.students} étudiants</div>
                <div className="text-xs text-muted-foreground">{course.assignments} devoirs</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

const courses = [
  {
    id: 1,
    title: "Mathématiques",
    teacher: "Prof. Dupont",
    description: "Algèbre, géométrie et calcul différentiel",
    students: 32,
    assignments: 5,
    hasNewContent: true,
  },
  {
    id: 2,
    title: "Physique",
    teacher: "Prof. Martin",
    description: "Mécanique, électricité et magnétisme",
    students: 28,
    assignments: 4,
    hasNewContent: false,
  },
  {
    id: 3,
    title: "Informatique",
    teacher: "Prof. Bernard",
    description: "Programmation, algorithmes et structures de données",
    students: 24,
    assignments: 6,
    hasNewContent: true,
  },
  {
    id: 4,
    title: "Chimie",
    teacher: "Prof. Petit",
    description: "Chimie organique et inorganique",
    students: 30,
    assignments: 3,
    hasNewContent: false,
  },
  {
    id: 5,
    title: "Biologie",
    teacher: "Prof. Moreau",
    description: "Étude des organismes vivants et de leurs interactions",
    students: 26,
    assignments: 4,
    hasNewContent: false,
  },
  {
    id: 6,
    title: "Histoire",
    teacher: "Prof. Leroy",
    description: "Histoire mondiale et civilisations",
    students: 22,
    assignments: 2,
    hasNewContent: false,
  },
]

