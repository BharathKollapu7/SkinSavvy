import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatWindow from './ChatWindow';

const FloatingChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Lock/unlock body scroll when chatbot opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Floating Bubble */}
      <div className="fixed bottom-6 right-4 md:right-6 z-50">
        {/* Tooltip */}
        {!isOpen && showTooltip && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-gradient-to-r from-olive-gold to-warm-taupe text-white px-4 py-3 rounded-xl shadow-xl whitespace-nowrap chatbot-floating animate-fade-in">
            <div className="text-sm font-semibold">✨ Need skincare assistance?</div>
            <div className="text-xs opacity-90">Ask me anything!</div>
            <div className="absolute bottom-[-6px] right-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-olive-gold"></div>
          </div>
        )}
        
        {/* Chat Bubble */}
        <button
          onClick={toggleChat}
          className={cn(
            "w-16 h-16 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-olive-gold/30 border-2 border-white/20",
            isOpen 
              ? "bg-gradient-to-r from-deep-umber to-sage-grey text-white rotate-180 scale-95" 
              : "bg-gradient-to-r from-olive-gold to-warm-taupe text-white chatbot-floating hover:animate-none hover:shadow-2xl"
          )}
          aria-label="Open skincare chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6 mx-auto" />
          ) : (
            <MessageCircle className="w-6 h-6 mx-auto" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
};

export default FloatingChatBubble;