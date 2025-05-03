
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
    // Force reinitialize room data to update with new images
    const updateRoomData = async () => {
      // First, check if we already have rooms in the database
      const { data: existingRooms } = await supabase.from("rooms").select("id").limit(1);
      
      // If rooms exist, delete them all to force reinitialization with new images
      if (existingRooms && existingRooms.length > 0) {
        await supabase.from("rooms").delete().neq("id", "0"); // Delete all rooms
      }
      
      // Now initialize room data with new images
      await initializeRoomData();
    };
    
    updateRoomData();
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
