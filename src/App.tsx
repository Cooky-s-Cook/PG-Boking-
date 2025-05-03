
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { useEffect } from "react";
import { initializeRoomData } from "./services/roomService";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rooms from "./pages/Rooms";
import PGFacilities from "./pages/PGFacilities";
import BookingForm from "./pages/BookingForm";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize room data when app starts
    initializeRoomData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/facilities" element={<PGFacilities />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
