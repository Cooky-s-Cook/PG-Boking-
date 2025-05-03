
import { supabase } from "@/integrations/supabase/client";
import { Room } from "@/types";

// Images provided by the user
const roomImages = [
  "public/lovable-uploads/59ec7c47-40af-4470-829a-03ae92674417.png",
  "public/lovable-uploads/d1ba1bc5-1564-4423-b79a-bef31e21fa5a.png",
  "public/lovable-uploads/7b100351-3c39-440f-86e3-f483ddef6df5.png",
  "public/lovable-uploads/849dbfed-64df-4473-84ba-78166dc79bf7.png",
  "public/lovable-uploads/bbd4331a-04bf-4afd-818d-7e4876f378d5.png"
];

const initialRooms = [
  {
    room_number: "101",
    type: "Double",
    price_per_month: 6000,
    availability: "Available",
    image: roomImages[0],
    features: ["Attached Bathroom", "TV", "Wardrobe", "Twin Beds", "Air Conditioner", "String Lights", "Wall Decor"],
    description: "Cozy double room with twin beds, TV, and attached bathroom. Features aesthetic string lights and wall decor."
  },
  {
    room_number: "102",
    type: "Single",
    price_per_month: 4500,
    availability: "Available",
    image: roomImages[1],
    features: ["Air Conditioner", "Double Bed", "TV", "Wardrobe", "Window", "Gallery Wall", "Plants"],
    description: "Comfortable single room with a double bed and air conditioning. Orange and navy blue themed with plants and photo gallery wall."
  },
  {
    room_number: "103",
    type: "Double",
    price_per_month: 5500,
    availability: "Available",
    image: roomImages[2],
    features: ["Air Conditioner", "Double Bed", "Desk", "Bookshelf", "Study Area", "Wall Art"],
    description: "Modern dark-themed double room with a large bed, built-in bookshelf and study area perfect for students."
  },
  {
    room_number: "201",
    type: "Double",
    price_per_month: 5000,
    availability: "Available",
    image: roomImages[3],
    features: ["Twin Beds", "Study Table", "Colorful Design", "Large Windows", "Bright Interior"],
    description: "Vibrant twin-sharing room with turquoise and yellow color scheme, perfect for students looking for a cheerful environment."
  },
  {
    room_number: "202",
    type: "Triple",
    price_per_month: 3500,
    availability: "Booked",
    image: roomImages[4],
    features: ["Multiple Beds", "Study Area", "Wardrobe", "Curtains", "Basic Amenities"],
    description: "Practical triple sharing room with multiple beds, study desk and storage solutions."
  },
  {
    room_number: "203",
    type: "Four-sharing",
    price_per_month: 3000,
    availability: "Available",
    image: roomImages[0],
    features: ["Air Conditioner", "Four Single Beds", "Shared Bathroom", "String Lights"],
    description: "Economic four sharing room with all essential amenities and aesthetic lighting provided."
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
