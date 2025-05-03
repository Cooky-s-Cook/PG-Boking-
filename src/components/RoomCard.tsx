
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Room } from "@/types";
import { Bed } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const isAvailable = room.availability === 'Available';

  return (
    <Card className="card-hover overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={room.image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
          alt={`Room ${room.roomNumber}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {room.availability}
        </Badge>
      </div>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Room {room.roomNumber}</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Bed className="h-3 w-3" /> 
            {room.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-muted-foreground truncate">
          {room.description || `A comfortable ${room.type.toLowerCase()} room with basic amenities.`}
        </p>
        <p className="mt-2 text-lg font-bold text-pg-primary">
          ₹{room.pricePerMonth.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/month</span>
        </p>
      </CardContent>
      <CardFooter>
        {isAvailable ? (
          <Link to={`/booking?roomId=${room.id}`} className="w-full">
            <Button className="w-full bg-pg-primary hover:bg-pg-dark">
              Book Now
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full">
            Currently Booked
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
