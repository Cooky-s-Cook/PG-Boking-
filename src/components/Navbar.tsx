
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User, Bed } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-pg-primary" />
            <Link to="/" className="text-xl font-bold text-pg-primary">PG Booking</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-slate-700 hover:text-pg-primary">Home</Link>
            <Link to="/rooms" className="px-3 py-2 text-slate-700 hover:text-pg-primary">Rooms</Link>
            <Link to="/facilities" className="px-3 py-2 text-slate-700 hover:text-pg-primary">PG Facilities</Link>
            <Link to="/booking" className="px-3 py-2 text-slate-700 hover:text-pg-primary">Book Now</Link>
            <Link to="/login">
              <Button variant="default" size="sm" className="bg-pg-primary hover:bg-pg-dark">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-pg-light hover:text-pg-primary">
              Home
            </Link>
            <Link to="/rooms" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-pg-light hover:text-pg-primary">
              Rooms
            </Link>
            <Link to="/facilities" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-pg-light hover:text-pg-primary">
              PG Facilities
            </Link>
            <Link to="/booking" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-pg-light hover:text-pg-primary">
              Book Now
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-pg-primary hover:bg-pg-dark">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
