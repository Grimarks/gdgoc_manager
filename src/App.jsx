import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "../src/components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Events from "./pages/Events";
import CoreTeam from "./pages/CoreTeam";
import Projects from "./pages/Projects";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
  );
}
