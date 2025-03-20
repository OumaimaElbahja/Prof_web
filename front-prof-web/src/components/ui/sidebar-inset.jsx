"use client";
import React, { useEffect, useState } from 'react'
import { SidebarInset, SidebarTrigger } from './sidebar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb'
import { usePathname, useRouter } from 'next/navigation';

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
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
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
                    {/* <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Hello Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb> */}
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
                <main className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-min">
                    {children}
                </main>
            </div>
        </SidebarInset>
    )
}

