"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

type Contact = {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away" | "busy"
  lastMessage?: string
  unread?: number
  course?: string
}

const professors: Contact[] = [
  {
    id: "prof1",
    name: "Dr. Jane Smith",
    role: "Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Please submit your assignment by Friday",
    course: "Computer Science 101",
  },
  {
    id: "prof2",
    name: "Prof. Michael Johnson",
    role: "Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "Office hours canceled tomorrow",
    unread: 2,
    course: "Data Structures",
  },
  {
    id: "prof3",
    name: "Dr. Sarah Williams",
    role: "Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    course: "Introduction to AI",
  },
  {
    id: "prof4",
    name: "Prof. David Lee",
    role: "Professor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    course: "Web Development",
  },
]

const classmates: Contact[] = [
  {
    id: "student1",
    name: "Alex Johnson",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Did you finish the group project?",
    unread: 3,
  },
  {
    id: "student2",
    name: "Emma Davis",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Thanks for the notes!",
  },
  {
    id: "student3",
    name: "Ryan Martinez",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
  {
    id: "student4",
    name: "Sophia Wilson",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
  },
  {
    id: "student5",
    name: "James Taylor",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
]

const support: Contact[] = [
  {
    id: "support1",
    name: "IT Support",
    role: "Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    id: "support2",
    name: "Academic Advisor",
    role: "Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Your course registration is complete",
    unread: 1,
  },
  {
    id: "support3",
    name: "Library Services",
    role: "Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
  },
]

export function ContactList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  const filterContacts = (contacts: Contact[]) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.course && contact.course.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  const handleContactClick = (contactId: string) => {
    setSelectedContact(contactId)
    // In a real app, this would trigger loading the conversation
  }

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg">Contacts</CardTitle>
      </CardHeader>
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Tabs defaultValue="professors">
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="professors" className="flex-1">
              Professors
            </TabsTrigger>
            <TabsTrigger value="classmates" className="flex-1">
              Classmates
            </TabsTrigger>
            <TabsTrigger value="support" className="flex-1">
              Support
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-0">
          <TabsContent value="professors" className="m-0">
            <div className="h-[calc(100vh-20rem)] overflow-y-auto px-2">
              {filterContacts(professors).length > 0 ? (
                filterContacts(professors).map((professor) => (
                  <div
                    key={professor.id}
                    className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-accent ${
                      selectedContact === professor.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleContactClick(professor.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={professor.avatar || "/placeholder.svg"} alt={professor.name} />
                        <AvatarFallback>{professor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          professor.status === "online"
                            ? "bg-green-500"
                            : professor.status === "away"
                              ? "bg-yellow-500"
                              : professor.status === "busy"
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{professor.name}</p>
                        {professor.unread && (
                          <Badge variant="secondary" className="ml-auto">
                            {professor.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{professor.course}</p>
                      {professor.lastMessage && <p className="text-xs truncate mt-1">{professor.lastMessage}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <p className="text-sm text-muted-foreground">No professors found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="classmates" className="m-0">
            <div className="h-[calc(100vh-20rem)] overflow-y-auto px-2">
              {filterContacts(classmates).length > 0 ? (
                filterContacts(classmates).map((classmate) => (
                  <div
                    key={classmate.id}
                    className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-accent ${
                      selectedContact === classmate.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleContactClick(classmate.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={classmate.avatar || "/placeholder.svg"} alt={classmate.name} />
                        <AvatarFallback>{classmate.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          classmate.status === "online"
                            ? "bg-green-500"
                            : classmate.status === "away"
                              ? "bg-yellow-500"
                              : classmate.status === "busy"
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{classmate.name}</p>
                        {classmate.unread && (
                          <Badge variant="secondary" className="ml-auto">
                            {classmate.unread}
                          </Badge>
                        )}
                      </div>
                      {classmate.lastMessage && <p className="text-xs truncate mt-1">{classmate.lastMessage}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <p className="text-sm text-muted-foreground">No classmates found</p>
                </div>
              )}
            </div>
            <div className="p-2">
              <Button variant="outline" className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Classmate
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="support" className="m-0">
            <div className="h-[calc(100vh-20rem)] overflow-y-auto px-2">
              {filterContacts(support).length > 0 ? (
                filterContacts(support).map((supportContact) => (
                  <div
                    key={supportContact.id}
                    className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-accent ${
                      selectedContact === supportContact.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleContactClick(supportContact.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={supportContact.avatar || "/placeholder.svg"} alt={supportContact.name} />
                        <AvatarFallback>{supportContact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          supportContact.status === "online" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{supportContact.name}</p>
                        {supportContact.unread && (
                          <Badge variant="secondary" className="ml-auto">
                            {supportContact.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{supportContact.role}</p>
                      {supportContact.lastMessage && (
                        <p className="text-xs truncate mt-1">{supportContact.lastMessage}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <p className="text-sm text-muted-foreground">No support contacts found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
