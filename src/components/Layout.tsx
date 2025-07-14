
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNavbar from './layout/TopNavbar';
import Footer from './layout/Footer';

const Layout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile' || location.pathname === '/settings';

  // Animate elements on scroll
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location]);

  return (
    <div className={`flex flex-col min-h-screen ${isProfilePage ? 'profile-page' : ''}`}>
      {/* Background Image and Overlay (only for non-profile pages) */}
      {!isProfilePage && (
        <>
          <div className="page-background"></div>
          <div className="page-overlay"></div>
        </>
      )}
      
      <TopNavbar />
      
      <main className="flex-1 relative z-20">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
