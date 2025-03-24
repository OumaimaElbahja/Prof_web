

import * as React from "react";
import {

    LayoutDashboard,
    Settings

} from "lucide-react";
import { useRouter } from 'next/navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export function SearchBar() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const navigate = useRouter();
    const handleNavigation = (path) => {
        navigate.push(path);
        setOpen(false);
    };
    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant={'outiline'}
                className="text-xs   bg-background pl-8   gap-2 font-normal  border  rounded-full"
            >
                Search Pages{" "}
                <kbd className="pointer-events-none inline-flex h-7 select-none bg-primary items-center gap-1 rounded-lg border  text-primary-foreground px-2.5  font-mono text-[10px] font-medium text-main opacity-100">
                    <span className="text-xs">⌘</span>k
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                className="bg-mainDark border border-borderDark"
                style={{ backgroundColor: "#000" }}
            >
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="text-main grid gap-4">
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup className="text-main mt-4">
                        <CommandItem
                            className="cursor-pointer"
                            onSelect={() => handleNavigation("/admin")}
                        >
                            <LayoutDashboard size={22} />
                            <span className=" text-xs">Dashboard</span>
                        </CommandItem>

                    </CommandGroup>



                    <CommandSeparator />



                    <CommandSeparator />


                    <CommandSeparator />

                    <CommandGroup className="text-main" heading="Setup">
                        <CommandItem
                            className="cursor-pointer"
                            onSelect={() => handleNavigation("/admin/settings")}
                        >
                            <Settings />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
