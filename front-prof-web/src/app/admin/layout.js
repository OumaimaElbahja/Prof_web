import { SideBar } from "@/components/ui/sideBarApp";
import LoginPage from "../login/page";

export const metadata = {
  title: "Mohamed Saad AZIZI",
  description: "Generated by create next app",
};
const authenticated = true;

export default function RootLayout({ children }) {
  return (
    <div>
      <div className="h-full antialiased">
        {authenticated ? <SideBar>{children}</SideBar> : <LoginPage />}
      </div>
    </div>
  );
}
