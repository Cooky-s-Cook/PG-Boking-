
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BookingFormData } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  native: z.string().min(1, { message: "Native place is required" }),
  phoneNumber: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  numberOfSharing: z.enum(["1", "2", "3", "4"], {
    required_error: "Please select number of sharing",
  }),
  advancePaid: z.coerce.number().min(1000, { message: "Minimum advance of ₹1000 is required" }),
});

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      age: undefined,
      occupation: "",
      native: "",
      phoneNumber: "",
      email: user?.email || "",
      numberOfSharing: "1",
      advancePaid: 1000,
    },
  });

  const onSubmit = async (data: z.infer<typeof bookingFormSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your booking.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save booking to Supabase
      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        room_id: roomId,
        full_name: data.fullName,
        age: data.age,
        occupation: data.occupation,
        native: data.native,
        phone_number: data.phoneNumber,
        email: data.email,
        number_of_sharing: data.numberOfSharing,
        advance_paid: data.advancePaid
      });
      
      if (error) {
        throw error;
      }
      
      // If room ID is provided, update room availability
      if (roomId) {
        const { error: roomError } = await supabase
          .from("rooms")
          .update({ availability: "Booked" })
          .eq("id", roomId);
          
        if (roomError) {
          console.error("Failed to update room status:", roomError);
        }
      }
      
      toast({
        title: "Booking Successful!",
        description: "Your room has been booked successfully.",
      });
      
      // Redirect to rooms page
      navigate("/rooms");
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to complete booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom max-w-2xl py-10">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold">Room Booking Form</h1>
        <p className="text-muted-foreground">Please fill in your details to book your stay</p>
      </div>
      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your age" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Your occupation" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="native"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Native Place</FormLabel>
                  <FormControl>
                    <Input placeholder="Your hometown" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} disabled={isSubmitting} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="numberOfSharing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Sharing</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sharing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Single (1 Person)</SelectItem>
                        <SelectItem value="2">Double (2 Person)</SelectItem>
                        <SelectItem value="3">Triple (3 Person)</SelectItem>
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
                      <Input type="number" placeholder="Amount paid as advance" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-pg-primary hover:bg-pg-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Book Room"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
