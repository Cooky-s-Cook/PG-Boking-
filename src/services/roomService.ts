
import { supabase } from "@/integrations/supabase/client";
import { Room } from "@/types";

// Images provided by the user
const roomImages = [
  "public/lovable-uploads/86588abb-5c2d-4694-8ebf-af238b27e97f.png",
  "public/lovable-uploads/8dd8a373-267f-4048-b18a-b3121805aae2.png",
  "public/lovable-uploads/9970c2d9-3023-4b81-acbf-6b49d30c194e.png"
];

const initialRooms = [
  {
    room_number: "101",
    type: "Double",
    price_per_month: 6000,
    availability: "Available",
    image: roomImages[0],
    features: ["Attached Bathroom", "TV", "Wardrobe", "Twin Beds", "Air Conditioner"],
    description: "Cozy double room with twin beds, TV, and attached bathroom."
  },
  {
    room_number: "102",
    type: "Single",
    price_per_month: 4500,
    availability: "Available",
    image: roomImages[1],
    features: ["Air Conditioner", "Double Bed", "TV", "Wardrobe", "Window"],
    description: "Comfortable single room with a double bed and air conditioning."
  },
  {
    room_number: "103",
    type: "Double",
    price_per_month: 5500,
    availability: "Available",
    image: roomImages[2],
    features: ["Air Conditioner", "Double Bed", "TV", "Wardrobe", "Window", "Curtains"],
    description: "Spacious double room with a large bed, AC and a nice view."
  },
  {
    room_number: "201",
    type: "Single",
    price_per_month: 4000,
    availability: "Available",
    image: roomImages[0],
    features: ["Attached Bathroom", "Study Table", "Single Bed"],
    description: "Cozy single room with an attached bathroom and basic amenities."
  },
  {
    room_number: "202",
    type: "Triple",
    price_per_month: 3500,
    availability: "Booked",
    image: roomImages[1],
    features: ["Shared Bathroom", "Study Tables", "Three Single Beds"],
    description: "Comfortable triple sharing room with ample space for all occupants."
  },
  {
    room_number: "203",
    type: "Four-sharing",
    price_per_month: 3000,
    availability: "Available",
    image: roomImages[2],
    features: ["Air Conditioner", "Four Single Beds", "Shared Bathroom"],
    description: "Economic four sharing room with all essential amenities provided."
  }
];

export const initializeRoomData = async () => {
  try {
    // First check if we already have rooms
    const { data: existingRooms, error: checkError } = await supabase
      .from("rooms")
      .select("id")
      .limit(1);
    
    if (checkError) {
      console.error("Error checking for existing rooms:", checkError);
      return;
    }
    
    // If we already have rooms, don't add more
    if (existingRooms && existingRooms.length > 0) {
      console.log("Rooms already exist in the database");
      return;
    }
    
    // Insert the initial rooms if none exist
    const { data, error } = await supabase
      .from("rooms")
      .insert(initialRooms)
      .select();
    
    if (error) {
      console.error("Error initializing room data:", error);
      return;
    }
    
    console.log("Room data initialized successfully:", data);
    return data;
  } catch (error) {
    console.error("Error initializing room data:", error);
  }
};

export const getRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*");
  
  if (error) {
    throw error;
  }
  
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
