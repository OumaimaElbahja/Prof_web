"use client";
import React, { useEffect, useState } from "react";
import { Home, User, Briefcase, FileText } from 'lucide-react'

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function NavBar({
  className,

}) {
  const items = [
    {
      name: 'Home',
      url: '/',
      icon: Home
    },
    //{ name: 'About', url: '/about', icon: User },
    { name: 'Courses', url: '/courses', icon: Briefcase },
    { name: 'Publication', url: '/publications', icon: FileText },
    { name: 'Forum', url: '/forum', icon: FileText },
    { name: 'Contact', url: '/contact', icon: FileText },
    { name: 'Login', url: '/login', icon: FileText }
  ]
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    (<div
      className={cn(
        ` fixed ${isMobile && 'bottom-0'} sm:top-0 md:top-0 left-1/2  -translate-x-1/2  mb-6 sm:pt-6`,
        className
      )}>
      <div
        className="flex items-center gap-1y md:gap-3 bg-background/5 border  border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            (<Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 md:px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}>
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={24} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div
                      className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div
                      className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>)
          );
        })}
      </div>
    </div>)
  );
}
