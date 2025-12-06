import { LayoutDashboard, Users, Calendar, Award, FolderKanban } from "lucide-react";
import { NavLink } from "./NavLink.jsx";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../components/ui/sidebar.jsx";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Members", url: "/members", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Core Team", url: "/core-team", icon: Award },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
      <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
        <SidebarContent className="bg-white border-r border-gray-200">

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-8 bg-gdg-blue rounded-full" />
                <div className="w-2 h-8 bg-gdg-red rounded-full" />
                <div className="w-2 h-8 bg-gdg-yellow rounded-full" />
                <div className="w-2 h-8 bg-gdg-green rounded-full" />
              </div>
              {open && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">GDGoC</h2>
                    <p className="text-xs text-gray-500">UNSRI</p>
                  </div>
              )}
            </div>
          </div>

          {/* Menu */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-700">
              Management
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                            to={item.url}
                            end
                            className="hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            activeClassName="bg-gray-200 font-medium text-gray-900"
                        >
                          <item.icon className="h-4 w-4" />
                          {open && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
      </Sidebar>
  );
}
