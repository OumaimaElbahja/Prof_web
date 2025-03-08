"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="">
      <Button
        onClick={() => {
          toast("Event has been created.");
        }}
      >
        Hello
      </Button>
    </div>
  );
}
