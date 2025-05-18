
import { ContactList } from "./contact-list"
import { MessagePanel } from "./message-panel"

export const metadata= {
  title: "Contact - Student Dashboard",
  description: "Contact your professors and classmates",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">Connect with your professors and classmates.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <ContactList />
        </div>
        <div className="md:col-span-2">
          <MessagePanel />
        </div>
      </div>
    </div>
  )
}
