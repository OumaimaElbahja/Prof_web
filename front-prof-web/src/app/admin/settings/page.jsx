
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { NotificationSettings } from "./notification-settings"
import { CourseSettings } from "./course-settings"
import { PrivacySettings } from "./privacy-settings"
import { AccountSettings } from "./account-settings"
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"

export const metadata = {
  title: "Settings",
  description: "Manage your professor account settings and preferences.",
}

export default function SettingsPage() {

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">

        <TabsList className="p-3 md:grid w-full grid-cols-5">
          {/* <ScrollArea className="w-96 whitespace-nowrap rounded-md border"> */}
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="courses">Course Defaults</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          {/* <ScrollBar orientation="horizontal" /> */}
          {/* </ScrollArea> */}
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="courses" className="mt-6">
          <CourseSettings />
        </TabsContent>
        <TabsContent value="privacy" className="mt-6">
          <PrivacySettings />
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

