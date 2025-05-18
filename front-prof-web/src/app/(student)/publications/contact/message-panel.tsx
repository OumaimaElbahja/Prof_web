"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, MoreVertical, Phone, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  content: string
  sender: "me" | "other"
  timestamp: Date
  read: boolean
}

// Sample conversation with a professor
const sampleMessages: Message[] = [
  {
    id: "msg1",
    content: "Hello, I wanted to discuss the upcoming project deadline.",
    sender: "me",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "msg2",
    content: "Hi there! Yes, what questions do you have about the deadline?",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    read: true,
  },
  {
    id: "msg3",
    content:
      "I was wondering if we could have a short extension for our team? We've run into some technical issues with the database integration.",
    sender: "me",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    read: true,
  },
  {
    id: "msg4",
    content: "I understand. Can you provide more details about the specific issues you're facing?",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21), // 21 hours ago
    read: true,
  },
  {
    id: "msg5",
    content:
      "We're having trouble with the API integration. The documentation is unclear about how to handle authentication for batch requests.",
    sender: "me",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "msg6",
    content:
      "I see. I can grant your team a 48-hour extension. Please make sure to document the issues you faced and how you resolved them in your final submission.",
    sender: "other",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true,
  },
  {
    id: "msg7",
    content: "Thank you so much! We'll make sure to include detailed documentation of the challenges and solutions.",
    sender: "me",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    read: true,
  },
]

export function MessagePanel() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: `msg${messages.length + 1}`,
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: `msg${messages.length + 2}`,
        content: "I'll review this and get back to you soon.",
        sender: "other",
        timestamp: new Date(),
        read: false,
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {}
  messages.forEach((message) => {
    const dateKey = formatDate(message.timestamp)
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = []
    }
    groupedMessages[dateKey].push(message)
  })

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 px-4 py-3 border-b">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Jane Smith" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">Dr. Jane Smith</div>
          <div className="text-xs text-muted-foreground">Computer Science 101 • Online</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Call</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
            <span className="sr-only">Video call</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuItem>Block contact</DropdownMenuItem>
              <DropdownMenuItem>Clear conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{date}</div>
            </div>
            {dateMessages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "other" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Jane Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div>{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-3 border-t">
        <div className="flex w-full items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
