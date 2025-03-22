import { Button } from "@/components/ui/button";
import { BookX, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center  px-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
        <div className="rounded-full bg-red-100 p-6">
          <BookX className="h-12 w-12 text-red-600" aria-hidden="true" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Page Not Found
        </h1>

        <div className="space-y-4">
          <p className="text-lg text-slate-600">
            Oops! It looks like this lesson doesn't exist. The page you're
            looking for might have been moved, deleted, or never existed.
          </p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-slate-500">Error code: 404</p>
            <div className="h-px w-16 bg-slate-200" />
            <p className="text-sm text-slate-500">
              Please check the URL or return to the homepage
            </p>
          </div>
        </div>

        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
