
import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-playfair text-xl mb-4">SkinSavvy.</h3>
          <p className="text-gray-600 mb-4">Your personalized guide to healthier skin and effective skincare routines.</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/recommendations" className="text-gray-600 hover:text-skin-beige">Recommendations</Link></li>
            <li><Link to="/skin-type" className="text-gray-600 hover:text-skin-beige">Skin Quiz</Link></li>
            <li><Link to="/pro-info" className="text-gray-600 hover:text-skin-beige">Pro-Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <p className="text-gray-600">skinsavvy.contact@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default FooterNavigation;
