
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Facility } from "@/types";

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  return (
    <Card className="card-hover h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{facility.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{facility.description}</p>
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
