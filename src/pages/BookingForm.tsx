
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookingFormData, Room } from "@/types";

const bookingSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.coerce.number().min(18, { message: "Must be at least 18 years old" }).max(100),
  occupation: z.string().min(2, { message: "Please enter your occupation" }),
  native: z.string().min(2, { message: "Please enter your native place" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  numberOfSharing: z.enum(["1", "2", "3", "4"], { 
    required_error: "Please select number of sharing" 
  }),
  advancePaid: z.coerce.number().min(1000, { message: "Minimum advance is ₹1000" })
});

const roomsData: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    type: "Single",
    pricePerMonth: 6000,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "2",
    roomNumber: "102",
    type: "Double",
    pricePerMonth: 4500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "4",
    roomNumber: "201",
    type: "Four-sharing",
    pricePerMonth: 3500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "5",
    roomNumber: "202",
    type: "Single",
    pricePerMonth: 6500,
    availability: "Available",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      age: undefined,
      occupation: "",
      native: "",
      phoneNumber: "",
      email: "",
      numberOfSharing: "1",
      advancePaid: 1000
    },
  });

  useEffect(() => {
    if (roomId) {
      // Simulate API call to get room details
      // In a real app, this would be an actual API call
      const room = roomsData.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
        
        // Auto-select the number of sharing based on room type
        const sharingMap: Record<string, "1" | "2" | "3" | "4"> = {
          "Single": "1",
          "Double": "2",
          "Triple": "3",
          "Four-sharing": "4"
        };
        
        form.setValue("numberOfSharing", sharingMap[room.type]);
      }
    }
  }, [roomId, form]);

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    
    try {
      // Add room ID if one was selected
      const bookingData = roomId ? { ...data, roomId } : data;
      
      // This is where you would typically make the API call
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData),
      // });
      
      console.log('Booking submitted with data:', bookingData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking Submitted",
        description: "Your booking request has been submitted successfully!",
      });
      
      // Reset form after successful submission
      form.reset();
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Book Your Stay</h1>
        <p className="mt-2 text-muted-foreground">
          Fill in your details to book your accommodation
        </p>
      </div>
      
      <div className="mx-auto max-w-3xl">
        <Card>
          {selectedRoom && (
            <div className="bg-pg-light p-4 rounded-t-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Selected Room: {selectedRoom.roomNumber}</h3>
                  <p className="text-muted-foreground">{selectedRoom.type} | ₹{selectedRoom.pricePerMonth}/month</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedRoom(null);
                    window.history.pushState({}, "", "/booking");
                  }}
                >
                  Change Room
                </Button>
              </div>
            </div>
          )}
          
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Please provide your details for booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Student/Professional" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="native"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Native Place</FormLabel>
                        <FormControl>
                          <Input placeholder="Your hometown" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email ID</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="numberOfSharing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Sharing Rooms</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={isLoading || !!selectedRoom}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of sharing" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Single</SelectItem>
                            <SelectItem value="2">Double Sharing</SelectItem>
                            <SelectItem value="3">Triple Sharing</SelectItem>
                            <SelectItem value="4">Four Sharing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="advancePaid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advance Payment (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormDescription>
                          Minimum advance is ₹1000
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-pg-primary hover:bg-pg-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Booking"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
