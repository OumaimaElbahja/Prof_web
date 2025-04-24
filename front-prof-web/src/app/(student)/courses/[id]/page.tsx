import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, MessageSquare, Video, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CourseDetail({ params }: { params: { id: string } }) {
  // Dans une application réelle, vous récupéreriez les données du cours à partir de l'ID
  const courseId = Number.parseInt(params.id)
  const course = courses.find((c) => c.id === courseId) || courses[0]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/student/courses">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
        <Badge variant="outline" className="ml-2">
          {course.semester}
        </Badge>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Enseignant: {course.teacher}</p>
        <p>{course.schedule}</p>
      </div>

      <Tabs defaultValue="materials">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">Matériel de cours</TabsTrigger>
          <TabsTrigger value="assignments">Devoirs</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="grades">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">Matériel de cours</h2>

          {course.modules.map((module, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-medium">{module.title}</h3>
              <div className="grid gap-3">
                {module.materials.map((material, mIndex) => (
                  <Card key={mIndex}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {material.type === "document" && <FileText className="h-4 w-4" />}
                          {material.type === "video" && <Video className="h-4 w-4" />}
                          {material.type === "lecture" && <BookOpen className="h-4 w-4" />}
                          <CardTitle className="text-base">{material.title}</CardTitle>
                        </div>
                        {material.isNew && <Badge>Nouveau</Badge>}
                      </div>
                    </CardHeader>
                    <CardFooter className="py-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Télécharger
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {index < course.modules.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">Devoirs</h2>

          <div className="grid gap-4">
            {course.assignments.map((assignment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{assignment.title}</CardTitle>
                    {assignment.status === "pending" && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        À rendre
                      </Badge>
                    )}
                    {assignment.status === "submitted" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Soumis
                      </Badge>
                    )}
                    {assignment.status === "graded" && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Noté
                      </Badge>
                    )}
                  </div>
                  <CardDescription>Date limite: {assignment.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assignment.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {assignment.status === "graded" && (
                    <div className="text-sm font-medium">Note: {assignment.grade}/20</div>
                  )}
                  <Button variant="outline" size="sm">
                    {assignment.status === "pending" ? "Soumettre" : "Voir les détails"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">Discussions</h2>

          <div className="grid gap-4">
            {course.discussions.map((discussion, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{discussion.title}</CardTitle>
                    <Badge variant="outline">{discussion.replies} réponses</Badge>
                  </div>
                  <CardDescription>
                    Démarré par {discussion.author} • {discussion.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{discussion.preview}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Participer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold">Notes</h2>

          <Card>
            <CardHeader>
              <CardTitle>Résumé des notes</CardTitle>
              <CardDescription>Moyenne actuelle: {course.grades.average}/20</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.grades.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="font-medium">{item.score}/20</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const courses = [
  {
    id: 1,
    title: "Mathématiques",
    teacher: "Prof. Dupont",
    semester: "Semestre 1",
    schedule: "Lundi et Mercredi, 10h-12h",
    modules: [
      {
        title: "Module 1: Algèbre linéaire",
        materials: [
          { title: "Introduction aux matrices", type: "document", isNew: false },
          { title: "Cours sur les déterminants", type: "video", isNew: true },
          { title: "Exercices sur les espaces vectoriels", type: "document", isNew: false },
        ],
      },
      {
        title: "Module 2: Calcul différentiel",
        materials: [
          { title: "Limites et continuité", type: "document", isNew: false },
          { title: "Dérivées et applications", type: "lecture", isNew: false },
          { title: "Intégrales définies", type: "document", isNew: true },
        ],
      },
    ],
    assignments: [
      {
        title: "Devoir 1: Matrices et déterminants",
        description: "Résoudre les exercices 1 à 10 du chapitre 3",
        dueDate: "15 octobre 2023",
        status: "graded",
        grade: 16,
      },
      {
        title: "Devoir 2: Espaces vectoriels",
        description: "Démontrer les théorèmes du chapitre 4",
        dueDate: "5 novembre 2023",
        status: "submitted",
      },
      {
        title: "Devoir 3: Calcul différentiel",
        description: "Résoudre les problèmes d'optimisation",
        dueDate: "25 novembre 2023",
        status: "pending",
      },
    ],
    discussions: [
      {
        title: "Question sur les matrices inversibles",
        author: "Jean Dupont",
        date: "10 octobre 2023",
        replies: 5,
        preview:
          "Je n'arrive pas à comprendre comment déterminer si une matrice est inversible sans calculer son déterminant...",
      },
      {
        title: "Préparation à l'examen final",
        author: "Marie Martin",
        date: "15 novembre 2023",
        replies: 12,
        preview: "Quels sont les sujets les plus importants à réviser pour l'examen final?",
      },
    ],
    grades: {
      average: 15.5,
      items: [
        { title: "Devoir 1", score: 16, date: "20 octobre 2023" },
        { title: "Examen partiel", score: 15, date: "1 novembre 2023" },
      ],
    },
  },
]

