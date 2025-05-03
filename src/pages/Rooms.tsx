
import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";
import { Room } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Rooms = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchRooms = async (): Promise<Room[]> => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*");
    
    if (error) {
      throw error;
    }
    
    // Transform the data to match our Room type
    return data.map(room => ({
      id: room.id,
      roomNumber: room.room_number,
      type: room.type as Room['type'],
      pricePerMonth: room.price_per_month,
      availability: room.availability as Room['availability'],
      image: room.image,
      features: room.features || [],
      description: room.description || ""
    }));
  };

  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load rooms. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredRooms = rooms.filter(room => {
    if (activeFilter === "all") return true;
    if (activeFilter === "available") return room.availability === "Available";
    return room.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const RoomSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <div className="container-custom py-10">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Available Rooms</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Browse our selection of comfortable and affordable rooms for your stay
        </p>
      </div>

      <Tabs 
        defaultValue="all" 
        className="mb-8"
        onValueChange={setActiveFilter}
        value={activeFilter}
      >
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="double">Double</TabsTrigger>
            <TabsTrigger value="triple">Triple</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <RoomSkeleton key={index} />
          ))}
        </div>
      ) : filteredRooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center">
          <h3 className="text-xl font-medium">No rooms found</h3>
          <p className="text-muted-foreground">Try changing your filters</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
