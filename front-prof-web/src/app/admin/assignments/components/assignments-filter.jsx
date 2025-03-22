"use client"

import { useState } from "react"
import { Search, Filter, List, Grid } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AssignmentsFilter() {
    const [selectedClass, setSelectedClass] = useState("all")
    const [viewMode, setViewMode] = useState("list")

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search assignments..." className="pl-8" />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="cs101">CS101</SelectItem>
                        <SelectItem value="cs201">CS201</SelectItem>
                        <SelectItem value="cs301">CS301</SelectItem>
                        <SelectItem value="cs401">CS401</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Published</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Open</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Closed</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Grading</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Graded</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center rounded-md border">
                    <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        className="rounded-none rounded-l-md"
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                        <span className="sr-only">List view</span>
                    </Button>
                    <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="icon"
                        className="rounded-none rounded-r-md"
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid className="h-4 w-4" />
                        <span className="sr-only">Grid view</span>
                    </Button>
                </div>
                <Select defaultValue="newest">
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="due-soon">Due Soon</SelectItem>
                        <SelectItem value="title-az">Title A-Z</SelectItem>
                        <SelectItem value="title-za">Title Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

