

import { Bell, HelpCircle, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function AppHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">

            <div className="relative ml-auto flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]" />
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Help</span>
            </Button>
        </header>
    )
}

