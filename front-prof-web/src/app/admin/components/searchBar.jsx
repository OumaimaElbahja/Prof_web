import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppSidebar } from "@src/components/sidebar/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@src/components/ui/breadcrumb";
import { Separator } from "@src/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@src/components/ui/sidebar";
import { SidebarRight } from "@src/components/sidebar/sidebar-right";
import { SidebarRightPOS } from "@src/components/sidebar/sidebar-right-pos";
import { SidebarRightQrCode } from "@src/components/sidebar/sidebar-right-qrcode";
import { breadcrumbMap } from "../constant";
import NotificationWidget from "./widgets/notification_widget";
import LanguageWidget from "./widgets/language_widget";
import ThemeWidget from "./widgets/theme_mode";
import { SearchBar } from "./widgets/search_bar";
import { useDashboard } from "../../hooks/useDashboard";
import { RestaurantSwitcher } from "@src/components/sidebar/restaurant-switcher";
import PreLoader from "./preloader";
import { usePreloaderStore } from "../../hooks/useStore";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";

export const SidebarContext = createContext();

function Layout() {
    const [breadcrumbNames, setBreadcrumbNames] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const pathParts = path.split("/").filter(Boolean);
    const { getAllRestaurant, loadingrestaurant } = useDashboard();
    const { t } = useTranslation();
    useEffect(() => {
        const breadcrumbItems = pathParts.map((part, index) => {
            const fullPath = "/" + pathParts.slice(0, index + 1).join("/");
            return breadcrumbMap[fullPath] || part;
        });

        setBreadcrumbNames(breadcrumbItems);
    }, [location]);
    const { isLoading } = usePreloaderStore();

    if (isLoading) {
        return <PreLoader />;
    }
    return (
        <>
            <Meta
                title="Colony Dashboard | QR Code Menu Management"
                description="Colony Backoffice Dashboard lets restaurants create, manage, and optimize their digital QR code menus. Simplify your workflow, track insights, and offer a seamless dining experience."
                keywords="QR code menu management, digital restaurant menu, restaurant dashboard, online menu creator, QR menu platform, contactless dining solutions, menu customization tool, food business management"
                url="http://mysite.com/dashboard"
                image="/Logos/ColonyLogoFavicon.svg"
            />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 mb-2 border-b border-borderDark shrink-0 w-full justify-between pr-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1 text-main hover:bg-[#111111] hover:text-main" />

                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbNames.map((name, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem
                                                className={
                                                    index === breadcrumbNames.length - 1
                                                        ? ""
                                                        : "opacity-60"
                                                }
                                            >
                                                {index === breadcrumbNames.length - 1 ? (
                                                    <BreadcrumbPage>{name}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink
                                                        href="#"
                                                        onClick={() =>
                                                            navigate(pathParts.slice(0, index + 1).join("/"))
                                                        }
                                                    >
                                                        {name}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {index < breadcrumbNames.length - 1 && (
                                                <BreadcrumbSeparator className="opacity-60" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                        </div>

                        <div className="mr-auto hidden 2xl:block">
                            <SearchBar />
                        </div>

                        <div className="flex items-center gap-2">
                            <LanguageWidget />
                            <NotificationWidget />
                            {/* <ThemeWidget />  */}
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <RestaurantSwitcher
                                    restaurants={getAllRestaurant?.data?.data}
                                    loadingrestaurant={loadingrestaurant}
                                />
                            </React.Suspense>
                        </div>
                    </header>
                    <Outlet />
                </SidebarInset>
                {location.pathname == "/theme-customization" && <SidebarRight />}
                {location.pathname == "/qrcode-customization" && <SidebarRightQrCode />}
                {location.pathname == "/point-of-sale" && <SidebarRightPOS />}
            </SidebarProvider>
        </>
    );
}

export default Layout;



// import * as React from "react";
// import {
//   BadgePercent,
//   Calculator,
//   Calendar,
//   CreditCard,
//   LayoutList,
//   MessagesSquare,
//   Palette,
//   PieChart,
//   QrCode,
//   Settings,
//   Settings2,
//   ShoppingBag,
//   Smile,
//   Star,
//   User,
// } from "lucide-react";
// import { BsQrCodeScan } from "react-icons/bs";
// import { IoMdImages } from "react-icons/io";
// import { FaCashRegister } from "react-icons/fa";
// import { RxDashboard } from "react-icons/rx";
// import { MdOutlineFastfood } from "react-icons/md";
// import { PiPicnicTable, PiUsers } from "react-icons/pi";
// import { useRouter } from 'next/navigation'
// import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

// export function SearchBar() {
//   const [open, setOpen] = React.useState(false);

//   React.useEffect(() => {
//     const down = (e) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setOpen((open) => !open);
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, []);

//   const navigate = useRouter();
//   const handleNavigation = (path) => {
//     navigate(path);
//     setOpen(false);
//   };
//   return (
//     <>
//       <Button
//         onClick={() => setOpen(true)}
//         className="text-xs w-96 items-center hover:bg-mainDark/50 justify-start gap-2 font-normal bg-mainDark border border-primaryDark rounded-full"
//       >
//         Search Pages{" "}
//         <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded-lg border border-borderDark bg-primaryDark/40 px-2.5 font-mono text-[10px] font-medium text-main opacity-100">
//           <span className="text-xs">⌘</span>k
//         </kbd>
//       </Button>
//       <CommandDialog
//         open={open}
//         onOpenChange={setOpen}
//         className="bg-mainDark border border-borderDark"
//         style={{ backgroundColor: "#000" }}
//       >
//         <CommandInput placeholder="Type a command or search..." />
//         <CommandList className="text-main grid gap-4">
//           <CommandEmpty>No results found.</CommandEmpty>

//           <CommandGroup className="text-main mt-4">
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/")}
//             >
//               <RxDashboard size={22} />
//               <span className=" text-xs">Dashboard</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/analytics")}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-chart-no-axes-combined"
//               >
//                 <path d="M12 16v5" />
//                 <path d="M16 14v7" />
//                 <path d="M20 10v11" />
//                 <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
//                 <path d="M4 18v3" />
//                 <path d="M8 14v7" />
//               </svg>
//               <span className=" text-xs">Analytics</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/point-of-sale")}
//             >
//               <FaCashRegister />
//               <span className=" text-xs">POS</span>
//             </CommandItem>
//           </CommandGroup>

//           <CommandGroup className="text-main" heading="Managment">
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/team")}
//             >
//               <PiUsers size={22} />
//               <span className=" text-xs">Team</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/stocks")}
//             >
//               <PieChart size={12} />
//               <span className=" text-xs">Stock</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/orders")}
//             >
//               <ShoppingBag size={12} />
//               <span className=" text-xs">Orders</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/tables")}
//             >
//               <PiPicnicTable />
//               <span className=" text-xs">Tables</span>
//             </CommandItem>
//           </CommandGroup>

//           <CommandSeparator />

//           <CommandGroup className="text-main" heading="Menu">
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/categories")}
//             >
//               <LayoutList />
//               <span>Categories</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/products")}
//             >
//               <MdOutlineFastfood />
//               <span className=" text-xs">Products</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/offers")}
//             >
//               <BadgePercent size={12} />
//               <span className=" text-xs">Offers</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/qrcodes-list")}
//             >
//               <BsQrCodeScan size={12} />
//               <span className=" text-xs">QrCodes List</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/gallery")}
//             >
//               <IoMdImages size={12} />
//               <span className=" text-xs">Gallery</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/feedback/reviews")}
//             >
//               <Star />
//               <span className=" text-xs">Reviews</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/feedback/complaints")}
//             >
//               <MessagesSquare />
//               <span className=" text-xs">Complaints</span>
//             </CommandItem>
//           </CommandGroup>

//           <CommandSeparator />

//           <CommandGroup className="text-main" heading="Customization">
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/theme-customization")}
//             >
//               <Palette />
//               <span>Theme</span>
//             </CommandItem>
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/qrcode-customization")}
//             >
//               <QrCode />
//               <span className=" text-xs">Qrcodes</span>
//             </CommandItem>
//           </CommandGroup>

//           <CommandSeparator />

//           <CommandGroup className="text-main" heading="Setup">
//             <CommandItem
//               className="cursor-pointer"
//               onSelect={() => handleNavigation("/settings")}
//             >
//               <Settings2 />
//               <span>Settings</span>
//             </CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>
//     </>
//   );
// }
