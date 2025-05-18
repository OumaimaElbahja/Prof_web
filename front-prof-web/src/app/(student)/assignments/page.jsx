import Link from "next/link"
import { CalendarDays, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentAssignments() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Mes devoirs</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-full pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrer</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tous les cours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les cours</SelectItem>
            <SelectItem value="math">Mathématiques</SelectItem>
            <SelectItem value="physics">Physique</SelectItem>
            <SelectItem value="cs">Informatique</SelectItem>
            <SelectItem value="chemistry">Chimie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">À faire</TabsTrigger>
          <TabsTrigger value="submitted">Soumis</TabsTrigger>
          <TabsTrigger value="graded">Notés</TabsTrigger>
          <TabsTrigger value="all">Tous</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 pt-4">
          {assignments
            .filter((a) => a.status === "pending")
            .map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 pt-4">
          {assignments
            .filter((a) => a.status === "submitted")
            .map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4 pt-4">
          {assignments
            .filter((a) => a.status === "graded")
            .map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 pt-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AssignmentCard({ assignment }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{assignment.title}</CardTitle>
          <div className="flex items-center gap-2">
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
            <Badge variant="outline">{assignment.course}</Badge>
          </div>
        </div>
        <CardDescription className="flex items-center mt-1">
          <CalendarDays className="h-3 w-3 mr-1" />
          {assignment.status === "pending"
            ? `À rendre avant le ${assignment.dueDate}`
            : `Rendu le ${assignment.submittedDate || "-"}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{assignment.description}</p>
        {assignment.status === "graded" && (
          <div className="mt-2 p-2 bg-muted rounded-md">
            <p className="text-sm font-medium">Note: {assignment.grade}/20</p>
            {assignment.feedback && <p className="text-sm mt-1">Commentaire: {assignment.feedback}</p>}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/assignments/${assignment.id}`}>
          <Button variant="outline">{assignment.status === "pending" ? "Soumettre" : "Voir les détails"}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}



const assignments = [
  {
    id: 1,
    title: "Devoir 1: Matrices et déterminants",
    course: "Mathématiques",
    description: "Résoudre les exercices 1 à 10 du chapitre 3",
    dueDate: "15 octobre 2023",
    status: "graded",
    submittedDate: "14 octobre 2023",
    grade: 16,
    feedback: "Excellent travail, quelques erreurs mineures dans l'exercice 7.",
  },
  {
    id: 2,
    title: "Rapport de laboratoire: Circuits électriques",
    course: "Physique",
    description: "Rédiger un rapport sur l'expérience réalisée en laboratoire",
    dueDate: "20 octobre 2023",
    status: "submitted",
    submittedDate: "19 octobre 2023",
  },
  {
    id: 3,
    title: "Projet de programmation: Application web",
    course: "Informatique",
    description: "Développer une application web simple avec HTML, CSS et JavaScript",
    dueDate: "25 octobre 2023",
    status: "pending",
  },
  {
    id: 4,
    title: "Analyse de composés organiques",
    course: "Chimie",
    description: "Identifier les composés organiques à partir des spectres fournis",
    dueDate: "30 octobre 2023",
    status: "pending",
  },
  {
    id: 5,
    title: "Dissertation: Révolution industrielle",
    course: "Histoire",
    description: "Rédiger une dissertation sur les impacts de la révolution industrielle",
    dueDate: "5 novembre 2023",
    status: "pending",
  },
]

