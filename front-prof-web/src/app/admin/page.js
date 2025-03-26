"use client"; // ✅ Ensure it's a client component
import { useEffect, useState } from "react";
import React from "react";
import { ClassesOverview } from "./components/classes-overview";
import { UpcomingEvents } from "./components/upcoming-events";
import { RecentAssignments } from "./components/recent-assignments";
import { StudentPerformance } from "./components/student-performance";
import { axiosClient } from "../api/axios";
// import { getUser } from "../api/auth/auth";
// import { axiosClient } from "../api/axios";
// import { cookies } from "next/headers";

export default function AdminDashboard() {
  // const cookieStore = await cookies(); // ✅ Await before using
  // const laravelSession = cookieStore.get("laravel_session");
  // console.log("Laravel Session:", laravelSession);
  // await axiosClient.get("/sanctum/csrf-cookie"); // Ensures Laravel recognizes session
  // try {
  //   const response = await axiosClient.get("/api/user");
  //   console.log("User data:", response.data);
  // } catch (error) {
  //   console.error("Auth check failed:", error);
  // }
  // const user = await getUser();
  // console.log("User:", user);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // await axiosClient.get("/sanctum/csrf-cookie"); // Ensure CSRF token is set
  //       const response = await axiosClient.get("/api/user");
  //       console.log("User data:", response.data);

  //       setUser(response.data);
  //     } catch (error) {
  //       toast.error("Failed to fetch user");
  //       console.error("Auth check failed:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <main className="flex-1 bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Professor Anderson
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-4 shadow">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-muted-foreground">Active Classes</span>
            </div>
            <div className="mt-1 text-3xl font-bold">4</div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-muted-foreground">Total Students</span>
            </div>
            <div className="mt-1 text-3xl font-bold">128</div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-muted-foreground">Pending Assignments</span>
            </div>
            <div className="mt-1 text-3xl font-bold">12</div>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-muted-foreground">Upcoming Events</span>
            </div>
            <div className="mt-1 text-3xl font-bold">3</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ClassesOverview className="lg:col-span-2" />
          <UpcomingEvents />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentAssignments />
          <StudentPerformance />
        </div>
      </div>
    </main>
  );
}
