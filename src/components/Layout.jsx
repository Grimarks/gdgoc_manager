import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar.jsx";
import { AppSidebar } from "./AppSidebar.jsx";
import { Button } from "./ui/button.jsx";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth.jsx";

export function Layout({ children }) {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-xl font-semibold text-gray-900">GDGoC UNSRI Management</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{user.email}</span>
                <Button variant="ghost" size="icon" onClick={signOut} className="text-gray-700 hover:bg-gray-100">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </header>
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
  );
}