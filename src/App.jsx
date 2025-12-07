import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "../src/components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Members from "./Pages/Members";
import Events from "./Pages/Events";
import CoreTeam from "./Pages/CoreTeam";
import Projects from "./Pages/Projects";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";
import {AuthProvider} from "./hooks/useAuth.jsx";

const queryClient = new QueryClient();

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />

              <Route
                  path="/"
                  element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  }
              />

              <Route
                  path="/members"
                  element={
                    <Layout>
                      <Members />
                    </Layout>
                  }
              />

              <Route
                  path="/projects"
                  element={
                    <Layout>
                      <Projects />
                    </Layout>
                  }
              />

              <Route
                  path="/events"
                  element={
                    <Layout>
                      <Events />
                    </Layout>
                  }
              />

              <Route
                  path="/core-team"
                  element={
                    <Layout>
                      <CoreTeam />
                    </Layout>
                  }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
          </AuthProvider>
      </QueryClientProvider>
  );
}
