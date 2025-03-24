import { NavBar } from "@/components/ui/NavBar";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Toaster />
    </>
  );
}
