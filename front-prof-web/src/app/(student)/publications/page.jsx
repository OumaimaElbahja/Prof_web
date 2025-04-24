import { CalendarDays, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentPublications() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Publications</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Rechercher..." className="w-full pl-8" />
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

      <div className="space-y-4">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={publication.authorAvatar} />
                    <AvatarFallback>{publication.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{publication.title}</CardTitle>
                    <CardDescription>
                      {publication.author} • {publication.date}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{publication.course}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{publication.content}</p>
              {publication.attachments && publication.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Pièces jointes:</p>
                  <div className="space-y-2">
                    {publication.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-2 rounded-md bg-muted">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{attachment}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="h-3 w-3 mr-1" />
                Publié le {publication.date}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}



const publications = [
  {
    id: 1,
    title: "Informations sur l'examen final",
    author: "Prof. Dupont",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "25 novembre 2023",
    course: "Mathématiques",
    content:
      "L'examen final aura lieu le 15 décembre de 9h à 12h dans l'amphithéâtre A. Vous aurez droit à une feuille de formules recto-verso manuscrite. L'examen portera sur tous les chapitres vus en cours, avec une emphase particulière sur les chapitres 3, 4 et 5.",
    attachments: ["Programme_examen_math.pdf", "Exemples_questions.pdf"],
  },
  {
    id: 2,
    title: "Report du TP de physique",
    author: "Prof. Martin",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "24 novembre 2023",
    course: "Physique",
    content:
      "En raison d'un problème technique dans le laboratoire, le TP prévu pour le 28 novembre est reporté au 5 décembre. Veuillez consulter le document joint pour les détails sur la préparation nécessaire.",
    attachments: ["Preparation_TP_physique.pdf"],
  },
  {
    id: 3,
    title: "Ressources supplémentaires pour le projet",
    author: "Prof. Bernard",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "22 novembre 2023",
    course: "Informatique",
    content:
      "Suite à vos questions lors du dernier cours, j'ai mis à disposition des ressources supplémentaires qui pourront vous aider pour votre projet de programmation. Vous trouverez des exemples de code et des tutoriels dans les fichiers joints.",
    attachments: ["Exemples_code.zip", "Tutoriel_avance.pdf"],
  },
  {
    id: 4,
    title: "Rappel: Date limite pour le rapport de laboratoire",
    author: "Prof. Petit",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "20 novembre 2023",
    course: "Chimie",
    content:
      "Je vous rappelle que la date limite pour rendre votre rapport de laboratoire sur l'analyse des composés organiques est le 30 novembre. Aucun retard ne sera accepté sans justification médicale.",
  },
  {
    id: 5,
    title: "Conférence sur l'histoire des sciences",
    author: "Prof. Moreau",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "18 novembre 2023",
    course: "Histoire",
    content:
      "Une conférence sur l'histoire des sciences aura lieu le 2 décembre à 14h dans l'amphithéâtre B. La participation est facultative mais fortement recommandée, car le sujet est en lien direct avec notre programme. Un compte-rendu pourra être valorisé dans votre note finale.",
    attachments: ["Programme_conference.pdf"],
  },
]

