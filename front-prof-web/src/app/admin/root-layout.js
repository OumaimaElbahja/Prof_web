"use client"; // ✅ Client Component

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "@/app/admin/components/app-sidebar";
import LoginPage from "../(auth)/login/page";
import AppSidebarInset from "@/app/admin/components/sidebar-inset";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { axiosClient } from "../api/axios";
import { toast } from "sonner";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/api/user");
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch user");
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {user ? (
        <SidebarProvider>
          <AppSidebar />
          <AppSidebarInset>{children}</AppSidebarInset>
        </SidebarProvider>
      ) : (
        <LoginPage />
      )}
      <Toaster />
    </>
  );
}
