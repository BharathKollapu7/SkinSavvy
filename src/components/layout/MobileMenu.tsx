
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, BookOpen } from 'lucide-react';
import { 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetClose 
} from '@/components/ui/sheet';

const MobileMenu = () => {
  return (
    <SheetContent side="right" className="bg-white">
      <SheetHeader className="border-b pb-4 mb-6">
        <SheetTitle className="text-skin-darkgreen font-playfair text-xl text-left">SkinSavvy</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-6">
        <SheetClose asChild>
          <Link
            to="/recommendations"
            className="flex items-center gap-3 text-skin-darkgreen hover:text-skin-beige transition p-3 rounded-lg hover:bg-skin-cream text-left"
          >
            <Heart size={20} />
            <span className="text-lg">Recommendations</span>
          </Link>
        </SheetClose>
        
        <SheetClose asChild>
          <Link
            to="/skin-type"
            className="flex items-center gap-3 text-skin-darkgreen hover:text-skin-beige transition p-3 rounded-lg hover:bg-skin-cream text-left"
          >
            <Search size={20} />
            <span className="text-lg">Skin Quiz</span>
          </Link>
        </SheetClose>
        
        <SheetClose asChild>
          <Link
            to="/pro-info"
            className="flex items-center gap-3 text-skin-darkgreen hover:text-skin-beige transition p-3 rounded-lg hover:bg-skin-cream text-left"
          >
            <BookOpen size={20} />
            <span className="text-lg">Pro-Info</span>
          </Link>
        </SheetClose>
      </div>
    </SheetContent>
  );
};

export default MobileMenu;
