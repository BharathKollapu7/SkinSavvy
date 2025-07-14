import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from './card';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  className?: string;
  disableScrollAnimation?: boolean;
}

const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  AnimatedCardProps
>(({ 
  children, 
  className, 
  disableScrollAnimation = false,
  ...props 
}, ref) => {
  const location = useLocation();
  const { elementRef, isVisible } = useScrollAnimation();
  
  // Check if we're on profile, auth, or sign-in related pages
  const isProfilePage = location.pathname.startsWith('/profile') || location.pathname.includes('profile');
  const isAuthPage = location.pathname === '/auth' || location.pathname.includes('auth') || location.pathname.includes('login') || location.pathname.includes('signin');
  const isRecommendationsPage = location.pathname === '/recommendations';
  
  // Disable animations for profile/auth pages and recommendations product cards
  const shouldDisableAnimations = isProfilePage || isAuthPage || (isRecommendationsPage && !disableScrollAnimation);
  
  // Only apply scroll animation if not disabled
  const shouldScrollAnimate = !disableScrollAnimation && !shouldDisableAnimations;

  return (
    <Card
      ref={shouldScrollAnimate ? elementRef : ref}
      className={cn(
        shouldScrollAnimate && "card-scroll-reveal",
        shouldScrollAnimate && isVisible && "visible",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
});

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };