"use client";
import React, { useEffect, useState } from 'react'
import { SidebarInset, SidebarTrigger } from '../../../components/ui/sidebar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../../components/ui/breadcrumb'
import { usePathname, useRouter } from 'next/navigation';
import { AppHeader } from '@/app/admin/components/app-header';

import { Bell, HelpCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchBar } from './searchBar';

export default function AppSidebarInset({ children }) {
    const [breadcrumbNames, setBreadcrumbNames] = useState([]);
    const path = usePathname();
    const pathParts = path.split("/").filter(Boolean);
    const breadcrumbMap = {
        "/admin": "Dashboard",
        "/admin/courses": "Courses",
        "/admin/settings": "Settings",
    };

    const navigate = useRouter();
    useEffect(() => {
        const breadcrumbItems = pathParts.map((part, index) => {
            const fullPath = "/" + pathParts.slice(0, index + 1).join("/");
            return breadcrumbMap[fullPath] || part;
        })
        setBreadcrumbNames(breadcrumbItems);
    }, [path]);

    return (
        <SidebarInset>

            <header className="flex sticky top-0 z-30 overflow-hidden  md:gap-4 border-b bg-background px-6 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbNames.map((name, index) => {
                            const fullPath = "/" + pathParts.slice(0, index + 1).join("/");
                            return (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem className={index === breadcrumbNames.length - 1 ? "" : "opacity-60"}>
                                        {index === breadcrumbNames.length - 1 ? (
                                            <BreadcrumbPage>{name}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                onClick={() => navigate.push(fullPath)}
                                                className="cursor-pointer hover:underline"
                                            >
                                                {name}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbNames.length - 1 && <BreadcrumbSeparator className="opacity-60" />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="relative flex ml-auto justify-end  flex-1 max-w-md">
                    <SearchBar />
                    {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]" /> */}
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
            <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
                <main className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-min">
                    {children}
                </main>
            </div>
        </SidebarInset>
    )
}

