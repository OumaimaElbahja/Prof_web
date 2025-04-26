import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { BookOpen, UserCog } from 'lucide-react'
import Link from 'next/link'
export default function DialogRegistration() {
    return (
        <Dialog>
            <DialogTrigger> <span className="underline underline-offset-4">
                Sign up
            </span></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Join as...</DialogTitle>
                    <DialogDescription className="text-center">
                        Select your role to continue registration
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Student Option */}
                        <Link
                            href={'/register/student'}
                            className="flex flex-col items-center gap-3 p-6 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <div className="p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-full">
                                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">Student</span>
                            <p className="text-sm text-muted-foreground text-center">
                                Access learning materials and courses
                            </p>
                        </Link>

                        {/* Teacher Option */}
                        <Link
                            href={'/register/teacher'}
                            className="flex flex-col items-center gap-3 p-6 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <div className="p-3 bg-primary-100/80 dark:bg-primary-900/30 rounded-full">
                                <UserCog className="w-6 h-6 text-primary dark:text-primary-400" />
                            </div>
                            <span className="font-medium">Teacher</span>
                            <p className="text-sm text-muted-foreground text-center">
                                Create and manage courses
                            </p>
                        </Link>
                    </div>
                </div>



            </DialogContent>

        </Dialog>
    )
}
