
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, ArrowLeft, BookOpen } from 'lucide-react';
import { 
  Sheet, 
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';

const Header = () => {
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-skin-darkgreen text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {!isHomePage && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.history.back()} 
                className="text-white hover:text-skin-cream mr-2 md:mr-4"
              >
                <ArrowLeft size={18} />
                <span className="sr-only md:not-sr-only md:ml-1">Back</span>
              </Button>
            )}
            <Link to="/" className="text-2xl font-bold font-playfair tracking-wide">
              SkinSavvy
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/recommendations" className="hover:text-skin-cream transition flex items-center gap-1.5">
              <Heart size={18} />
              <span>Recommendations</span>
            </Link>
            <Link to="/skin-type" className="hover:text-skin-cream transition flex items-center gap-1.5">
              <Search size={18} />
              <span>Skin Quiz</span>
            </Link>
            <Link to="/pro-info" className="hover:text-skin-cream transition flex items-center gap-1.5">
              <BookOpen size={18} />
              <span>Pro-Info</span>
            </Link>
          </nav>
          
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <MobileMenu />
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
