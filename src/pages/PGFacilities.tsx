
import { useState, useEffect } from "react";
import FacilityCard from "@/components/FacilityCard";
import { Facility } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const facilitiesData: Facility[] = [
  {
    id: "1",
    name: "Modern Kitchen",
    description: "Fully equipped kitchen with refrigerator, microwave, and cooking essentials.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "2",
    name: "Clean Bathrooms",
    description: "Well-maintained bathrooms with 24/7 hot water supply and essential amenities.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "3",
    name: "Spacious Common Area",
    description: "Comfortable common area with TV, sofa, and board games for relaxing after a long day.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "4",
    name: "Dining Area",
    description: "Clean and spacious dining area where you can enjoy your meals with fellow residents.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: "5",
    name: "Laundry Room",
    description: "In-house laundry facilities with washing and drying machines available for all residents.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "6",
    name: "Study Room",
    description: "Quiet study room with desks and high-speed internet for productive work sessions.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const PGFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from API
    const fetchFacilities = async () => {
      try {
        // In a real app, you would fetch from an API:
        // const response = await fetch('/api/pg-info');
        // const data = await response.json();
        // setFacilities(data);
        
        // For now, use our mock data with a delay to simulate API call
        setTimeout(() => {
          setFacilities(facilitiesData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load facilities. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchFacilities();
  }, [toast]);

  const FacilitySkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );

  return (
    <div className="container-custom py-10">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800">PG Facilities</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover the amenities and facilities available for your comfortable stay
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <FacilitySkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PGFacilities;
