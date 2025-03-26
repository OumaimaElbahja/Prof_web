import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Registration() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Educational Platform
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choose your registration path to get started
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <Link href="/register/student" className="w-full">
            <Button variant="default" size="lg" className="w-full">
              Register as Student
            </Button>
          </Link>
          <Link href="/register/teacher" className="w-full">
            <Button variant="outline" size="lg" className="w-full">
              Register as Teacher
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
