
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Home, Image, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Bed className="h-10 w-10 text-pg-primary" />,
      title: "Comfortable Rooms",
      description: "Choose from various room types including single, double, triple, and four-sharing options."
    },
    {
      icon: <Home className="h-10 w-10 text-pg-primary" />,
      title: "Modern Facilities",
      description: "Enjoy facilities like kitchen, laundry, study room, and common areas for recreation."
    },
    {
      icon: <Users className="h-10 w-10 text-pg-primary" />,
      title: "Community Living",
      description: "Be part of a friendly community with fellow residents from diverse backgrounds."
    },
    {
      icon: <Image className="h-10 w-10 text-pg-primary" />,
      title: "Prime Location",
      description: "Located in a prime area with easy access to public transport, markets, and educational institutions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pg-dark to-pg-primary py-16 md:py-24 text-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in">
                Find Your Perfect PG Accommodation
              </h1>
              <p className="text-lg opacity-90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Book affordable, comfortable, and well-maintained rooms with modern amenities and a friendly atmosphere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Link to="/rooms">
                  <Button size="lg" className="bg-white text-pg-primary hover:bg-gray-100">
                    View Rooms
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-[400px] rounded-lg overflow-hidden shadow-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="PG Accommodation"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Our PG?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our paying guest accommodation offers a comfortable, affordable, and convenient living experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-t-4 border-t-pg-primary">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-pg-light rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Ready to Book Your Stay?
                </h2>
                <p className="text-gray-600 mb-6">
                  Explore our available rooms and book your accommodation today. 
                  We offer flexible options to suit your needs and budget.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/rooms">
                    <Button className="bg-pg-primary hover:bg-pg-dark">
                      Browse Rooms
                    </Button>
                  </Link>
                  <Link to="/facilities">
                    <Button variant="outline">
                      View Facilities
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Address:</span> 
                    <span>123 Main Street, City, State 12345</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Phone:</span> 
                    <span>(123) 456-7890</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Email:</span> 
                    <span>info@pgbooking.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-xl font-bold flex items-center">
                <Home className="mr-2 h-6 w-6" />
                PG Booking
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/" className="hover:text-pg-secondary">Home</Link>
              <Link to="/rooms" className="hover:text-pg-secondary">Rooms</Link>
              <Link to="/facilities" className="hover:text-pg-secondary">Facilities</Link>
              <Link to="/booking" className="hover:text-pg-secondary">Book Now</Link>
              <Link to="/login" className="hover:text-pg-secondary">Login</Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2025 PG Booking System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
