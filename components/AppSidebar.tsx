"use client";
import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import React, { useState } from "react";
import { lora } from "./Header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar () {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const { state } = useSidebar();
  console.log(state);

  const toggleOpen = (title: string) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [title]: !prevStates[title],
    }));
  };

  return (
    <Sidebar collapsible="icon" className="mt-[68px]">
      <SidebarHeader className="bg-primary-0 pl-3 pt-8">
        <h3 className={`text-xl font-bold ${lora.className} text-gray-500`}>
          Categories
        </h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {state === 'expanded'
              ? <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  defaultOpen={false}
                  key={item.title}
                  className="group/collapsible"
                  open={openStates[item.title]}
                  onOpenChange={() => toggleOpen(item.title)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        <ChevronRight
                          className={`ml-auto transition-transform ${openStates[item.title] ? "rotate-90" : ""}`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton>ss</SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
                </SidebarMenu>
              : "hi"
            }
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
