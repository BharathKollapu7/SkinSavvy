import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

const TopNavbar = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Recommendations", href: "/recommendations" },
    { name: "Skin Quiz", href: "/skin-type" },
    { name: "Pro-Info", href: "/pro-info" }
  ];

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const isAuthActive = location.pathname === '/auth';

  return (
    <header className="sticky top-0 z-50 w-full nav-solid text-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Fixed left position */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold font-playfair tracking-wide text-soft-cream hover:text-white transition-colors">
              SkinSavvy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8 lg:space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-lg font-medium font-playfair transition-all duration-200 hover:bg-olive-gold hover:text-white hover:scale-105 min-h-[40px] flex items-center justify-center ${
                    location.pathname === item.href ? 
                    'text-white bg-moss-green shadow-lg' : 
                    'text-soft-cream hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Profile/Auth - Desktop Only */}
          <div className="hidden md:flex items-center flex-shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-olive-gold transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                      <AvatarFallback className="bg-soft-cream text-deep-umber font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                          <AvatarFallback className="bg-soft-cream text-deep-umber text-sm">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium text-deep-umber">
                            Hi, {profile?.full_name || 'User'}!
                          </p>
                          <p className="text-xs text-sage-grey">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-olive-gold hover:text-white hover:scale-105 flex items-center gap-2 min-h-[40px] ${
                  isAuthActive ? 
                  'text-white bg-moss-green shadow-lg' : 
                  'text-soft-cream hover:text-white'
                }`}
              >
                <User size={16} />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Navigation - Only Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-olive-gold">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-soft-cream">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                This sheet displays the mobile navigation menu and account controls.
              </SheetDescription>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b border-pale-mocha">
                  <span className="text-xl font-bold font-playfair text-deep-umber">
                    SkinSavvy
                  </span>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-deep-umber hover:bg-blush-beige">
                      <X size={24} />
                    </Button>
                  </SheetTrigger>
                </div>
                
                <div className="py-6 flex flex-col gap-3">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 text-left min-h-[48px] ${
                          location.pathname === item.href ? 
                          'bg-moss-green text-white font-semibold shadow-lg' : 
                          'text-deep-umber hover:bg-blush-beige'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}

                  {/* Mobile Profile/Auth Section - Only in Side Panel */}
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-t border-pale-mocha mt-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                            <AvatarFallback className="bg-light-sand text-deep-umber text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-deep-umber">
                              {profile?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-sage-grey">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Only one Sign Out button retained here */}
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          onClick={signOut}
                          className="flex items-center justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg text-red-600 hover:bg-red-50 min-h-[48px] transition-all duration-200"
                        >
                          <LogOut size={20} />
                          Sign Out
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link
                          to="/profile"
                          className="flex items-center justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg text-deep-umber hover:bg-blush-beige min-h-[48px] transition-all duration-200"
                        >
                          <User size={20} />
                          Profile
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link
                          to="/settings"
                          className="flex items-center justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg text-deep-umber hover:bg-blush-beige min-h-[48px] transition-all duration-200"
                        >
                          <Settings size={20} />
                          Settings
                        </Link>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        to="/auth"
                        className={`flex items-center justify-start gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 text-left min-h-[48px] ${
                          isAuthActive ? 
                          'bg-moss-green text-white font-semibold shadow-lg' : 
                          'text-deep-umber hover:bg-blush-beige'
                        }`}
                      >
                        <User size={20} />
                        Sign In
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
