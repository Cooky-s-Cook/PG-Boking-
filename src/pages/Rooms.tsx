
import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";
import { Room } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const roomsData: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    type: "Single",
    pricePerMonth: 6000,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    features: ["Attached Bathroom", "Study Table", "Single Bed"],
    description: "Cozy single room with an attached bathroom and basic amenities."
  },
  {
    id: "2",
    roomNumber: "102",
    type: "Double",
    pricePerMonth: 4500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    features: ["Shared Bathroom", "Study Tables", "Two Single Beds"],
    description: "Spacious double room with two single beds and study tables."
  },
  {
    id: "3",
    roomNumber: "103",
    type: "Triple",
    pricePerMonth: 4000,
    availability: "Booked",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    features: ["Shared Bathroom", "Study Tables", "Three Single Beds"],
    description: "Comfortable triple sharing room with ample space for all occupants."
  },
  {
    id: "4",
    roomNumber: "201",
    type: "Four-sharing",
    pricePerMonth: 3500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    features: ["Shared Bathroom", "Study Tables", "Four Single Beds"],
    description: "Economic four sharing room with all essential amenities provided."
  },
  {
    id: "5",
    roomNumber: "202",
    type: "Single",
    pricePerMonth: 6500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    features: ["Attached Bathroom", "Study Table", "AC", "Single Bed"],
    description: "Premium single room with AC and attached bathroom for comfort."
  },
  {
    id: "6",
    roomNumber: "203",
    type: "Double",
    pricePerMonth: 5000,
    availability: "Booked",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    features: ["Shared Bathroom", "Study Tables", "Two Single Beds"],
    description: "Standard double room with all necessary furnishings provided."
  }
];

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from API
    const fetchRooms = async () => {
      try {
        // In a real app, you would fetch from an API:
        // const response = await fetch('/api/rooms');
        // const data = await response.json();
        // setRooms(data);
        
        // For now, use our mock data with a delay to simulate API call
        setTimeout(() => {
          setRooms(roomsData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load rooms. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchRooms();
  }, [toast]);

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

      {loading ? (
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
