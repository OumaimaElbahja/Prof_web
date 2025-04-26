import { NavBar } from "@/components/ui/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <>
     <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

      <NavBar />
      <div className="container mx-auto p-16">{children}</div>
      
      <Toaster />
          </ThemeProvider>
    </>
  );
}
