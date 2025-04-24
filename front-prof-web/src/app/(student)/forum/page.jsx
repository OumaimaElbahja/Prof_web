import Link from "next/link"
import { MessageSquare, Plus, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentForum() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Forum de discussion</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4
           w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-full pl-8"/>
          </div>
          <Button variant="outline" size="icon">
            <Tag className="h-4 w-4" />
            <span className="sr-only">Filtrer par tags</span>
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau sujet
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

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="popular">Populaires</TabsTrigger>
          <TabsTrigger value="unanswered">Sans réponse</TabsTrigger>
          <TabsTrigger value="my-posts">Mes posts</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 pt-4">
          {discussions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4 pt-4">
          {discussions
            .sort((a, b) => b.replies - a.replies)
            .map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4 pt-4">
          {discussions
            .filter((d) => d.replies === 0)
            .map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </TabsContent>

        <TabsContent value="my-posts" className="space-y-4 pt-4">
          {discussions
            .filter((d) => d.author === "Vous")
            .map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DiscussionCard({ discussion }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={discussion.authorAvatar} />
              <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-base">{discussion.title}</CardTitle>
          </div>
          <Badge variant="outline">{discussion.course}</Badge>
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>
            Par {discussion.author} • {discussion.date}
          </span>
          <span className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            {discussion.replies} réponses
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{discussion.preview}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {discussion.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/forum/${discussion.id}`}>
          <Button variant="outline" size="sm">
            Voir la discussion
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}



const discussions = [
  {
    id: 1,
    title: "Question sur les matrices inversibles",
    author: "Jean Dupont",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "10 octobre 2023",
    course: "Mathématiques",
    preview:
      "Je n'arrive pas à comprendre comment déterminer si une matrice est inversible sans calculer son déterminant. Y a-t-il une méthode plus rapide?",
    replies: 5,
    tags: ["matrices", "algèbre", "devoir"],
  },
  {
    id: 2,
    title: "Préparation à l'examen final",
    author: "Marie Martin",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "15 novembre 2023",
    course: "Physique",
    preview:
      "Quels sont les sujets les plus importants à réviser pour l'examen final? Le professeur a-t-il donné des indications?",
    replies: 12,
    tags: ["examen", "révisions"],
  },
  {
    id: 3,
    title: "Problème avec le projet de programmation",
    author: "Vous",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "18 novembre 2023",
    course: "Informatique",
    preview:
      "J'ai un problème avec mon code JavaScript. La fonction ne retourne pas le résultat attendu. Voici mon code: function calculate() {...",
    replies: 3,
    tags: ["javascript", "projet", "bug"],
  },
  {
    id: 4,
    title: "Ressources supplémentaires pour la chimie organique",
    author: "Thomas Petit",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "20 novembre 2023",
    course: "Chimie",
    preview:
      "Est-ce que quelqu'un connaît de bonnes ressources en ligne pour approfondir la chimie organique? J'ai du mal avec les mécanismes de réaction.",
    replies: 2,
    tags: ["chimie organique", "ressources"],
  },
  {
    id: 5,
    title: "Groupe d'étude pour l'histoire",
    author: "Sophie Leroy",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "22 novembre 2023",
    course: "Histoire",
    preview:
      "Je cherche à former un groupe d'étude pour préparer l'examen d'histoire. Qui serait intéressé? On pourrait se retrouver à la bibliothèque.",
    replies: 8,
    tags: ["groupe d'étude", "examen"],
  },
  {
    id: 6,
    title: "Difficulté avec les intégrales",
    author: "Lucas Bernard",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "23 novembre 2023",
    course: "Mathématiques",
    preview:
      "J'ai du mal avec les intégrales par substitution. Quelqu'un pourrait-il m'expliquer avec un exemple simple?",
    replies: 0,
    tags: ["calcul", "intégrales"],
  },
]

