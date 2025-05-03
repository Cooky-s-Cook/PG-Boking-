
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
    <Card className="card-hover overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={room.image}
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
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {room.description || `A comfortable ${room.type.toLowerCase()} room with basic amenities.`}
        </p>
        <div className="mt-2 mb-1">
          <p className="text-xs text-muted-foreground">Features:</p>
          <div className="flex flex-wrap gap-1 my-1">
            {room.features && room.features.slice(0, 3).map((feature, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {room.features && room.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
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
