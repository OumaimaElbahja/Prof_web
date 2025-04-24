import { NavBar } from "@/components/ui/NavBar";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-16">{children}</div>
      
      <Toaster />
    </>
  );
}
