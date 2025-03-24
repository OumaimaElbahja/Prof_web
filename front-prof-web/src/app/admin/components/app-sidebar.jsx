import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    BarChart3,
    BookOpen,
    Calendar,
    GraduationCap,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
} from "lucide-react"
import { PiGraduationCapFill } from "react-icons/pi";


import { NavUser } from "../../../components/ui/nav-user"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Courses",
        url: "/admin/courses",
        icon: BookOpen,
    },
    {
        title: "Students",
        url: "/admin/students",
        icon: Users,
    },
    {
        title: "Assignments",
        url: "/admin/assignments",
        icon: GraduationCap,
    },
    {
        title: "Grades",
        url: "#",
        icon: BarChart3,
    },
    {
        title: "Schedule",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Messages",
        url: "#",
        icon: MessageSquare,
    },

    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
]
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" >

            <SidebarHeader
            >
                <SidebarMenu >
                    <SidebarMenuItem >
                        <SidebarMenuButton asChild>
                            <Link href="/admin" >
                                <PiGraduationCapFill className="h-12 w-12" />

                                <span >Prof Web</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    {/* <SidebarGroupLabel className={'h-2'}><Separator /></SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} >
                                            <item.icon />
                                            <span >{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>

    )
}
