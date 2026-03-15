import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PersonProfile from "./pages/PersonProfile.tsx";
import AllIndividuals from "./pages/AllIndividuals.tsx";
import AllDocuments from "./pages/AllDocuments.tsx";
import AllVideos from "./pages/AllVideos.tsx";
import AllTimeline from "./pages/AllTimeline.tsx";
import AllFlights from "./pages/AllFlights.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/person/:id" element={<PersonProfile />} />
          <Route path="/individuals" element={<AllIndividuals />} />
          <Route path="/documents" element={<AllDocuments />} />
          <Route path="/videos" element={<AllVideos />} />
          <Route path="/timeline" element={<AllTimeline />} />
          <Route path="/flights" element={<AllFlights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
