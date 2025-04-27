"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "@/app/admin/components/app-sidebar";
import LoginPage from "../(auth)/login/page";
import AppSidebarInset from "@/app/admin/components/sidebar-inset";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { axiosClient } from "../api/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UserContext, { useUserContext } from "@/context/UserContext";

export default function RootLayout({ children }) {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const context = useUserContext();
  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      try {
        if (typeof window === "undefined") return;
        console.log(context.authenticated);

        const authData = localStorage.getItem("auth");

        if (!authData) {
          setLoading(false);
          return;
        }

        const response = await axiosClient.get("/api/user");
        console.log("user response", response.data);

        context.setUser(response.data);
        setUserData(response.data);

        console.log("hello", context.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("auth");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchUser();
  }, [router, context]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <UserContext>
          <SidebarProvider>
            <AppSidebar />
            <AppSidebarInset>{children}</AppSidebarInset>
          </SidebarProvider>
        </UserContext>
      ) : (
        <LoginPage />
      )}
      <Toaster position="top-center" richColors />{" "}
    </>
  );
}
