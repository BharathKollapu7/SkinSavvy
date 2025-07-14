import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, History, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { correctSpelling } from '@/utils/spellCorrection';
import { sendChatMessage } from '@/utils/chatApi';
import { useAuth } from '@/contexts/AuthContext';
import { useChatHistory } from '@/hooks/useChatHistory';
import ChatHistoryModal from './ChatHistoryModal';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isExpanded?: boolean;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BotMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date | string | number;
  isExpanded?: boolean;
}

function formatTimestamp(ts: Date | string | number | null | undefined) {
  if (!ts) return '';
  let dateObj;
  if (ts instanceof Date) {
    dateObj = ts;
  } else if (typeof ts === 'number') {
    dateObj = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
  } else if (typeof ts === 'string') {
    dateObj = new Date(ts);
  } else {
    return '';
  }
  if (isNaN(dateObj.getTime())) return '';
  return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function convertToMessages(botMessages: BotMessage[]): Message[] {
  return botMessages.map(msg => ({
    ...msg,
    timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
  }));
}

const NAVBAR_HEIGHT_PX = 64; // h-16 in Tailwind

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! 👋 I'm SkinBot, your personal skincare assistant.\n\n• Ask about routines & products 🧴\n• Get ingredient advice ✨\n• Debunk skincare myths 💡\n\nWhat's your skincare question?",
      isUser: false,
      timestamp: new Date(),
      isExpanded: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { saveChatHistory } = useChatHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const correctedMessage = correctSpelling(inputMessage.trim());
    const userMessage: Message = {
      id: Date.now().toString(),
      content: correctedMessage,
      isUser: true,
      timestamp: new Date(),
      isExpanded: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await sendChatMessage(correctedMessage);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isUser: false,
        timestamp: new Date(),
        isExpanded: false,
      };

      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);

      if (user && updatedMessages.length > 1) {
        saveChatHistory(updatedMessages);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "• Connection issue detected 🔌\n• Please try again in a moment\n• I'll be right back! ✨",
        isUser: false,
        timestamp: new Date(),
        isExpanded: false,
      };
      const updatedMessages = [...messages, userMessage, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const loadHistoryMessages = (historicalMessages: BotMessage[]) => {
    setMessages(convertToMessages(historicalMessages));
  };

  if (!isOpen) return null;

  // Styles for maximized mode to offset below the navbar
  const maximizedStyle = isFullScreen
    ? {
        position: 'fixed' as const,
        top: NAVBAR_HEIGHT_PX,
        left: 0,
        width: '100vw',
        height: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
        maxHeight: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
        maxWidth: '100vw',
        borderRadius: 0,
        zIndex: 60, // Above navbar (navbar is z-50)
        background: 'white'
      }
    : {};

  return (
    <div
      className={cn(
        "fixed z-60 flex flex-col overflow-hidden animate-scale-in",
        isFullScreen
          ? "rounded-none"
          : "bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-96 h-[500px] max-h-[calc(100vh-8rem)] bg-white border border-pale-mocha rounded-2xl shadow-2xl"
      )}
      style={maximizedStyle}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-olive-gold to-warm-taupe text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">SkinBot</h3>
            <p className="text-xs opacity-90">Your skincare expert ✨</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isFullScreen && (
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Full screen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
          {isFullScreen && (
            <button
              onClick={() => setIsFullScreen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Minimize"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          )}
          {user && (
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Chat history"
            >
              <History className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-soft-cream to-cream-white">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              'flex animate-fade-in',
              message.isUser ? 'justify-end' : 'justify-start'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-2xl p-4 break-words shadow-lg',
                message.isUser
                  ? 'bg-gradient-to-r from-moss-green to-olive-gold text-white ml-4'
                  : 'bg-white border border-blush-beige text-deep-umber mr-4'
              )}
            >
              <div className="flex items-start space-x-3">
                {!message.isUser && (
                  <div className="w-8 h-8 bg-olive-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <div className={cn(
                    "text-sm leading-relaxed whitespace-pre-line",
                    message.isUser ? "font-medium" : "font-normal"
                  )}>
                    {message.isUser ? (
                      message.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-1" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-olive-gold" {...props} />,
                          em: ({node, ...props}) => <em className="italic text-skin-darkgreen" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2" {...props} />,
                          code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded text-xs" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  <div className={cn(
                    "text-xs mt-2 opacity-70",
                    message.isUser ? "text-white/70" : "text-sage-grey"
                  )}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white border border-blush-beige rounded-2xl p-4 max-w-[85%] shadow-lg mr-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-olive-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-olive-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-olive-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-olive-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-sage-grey font-medium">SkinBot is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-pale-mocha bg-white">
        <div className="flex space-x-3">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about skincare routines, ingredients..."
            className="flex-1 border-blush-beige focus:ring-2 focus:ring-olive-gold focus:border-olive-gold rounded-xl px-4 py-3 text-sm placeholder:text-sage-grey"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-olive-gold to-warm-taupe hover:from-warm-taupe hover:to-olive-gold text-white px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setInputMessage("What's a good skincare routine for beginners?")}
            className="px-3 py-1.5 text-xs bg-blush-beige text-deep-umber rounded-full hover:bg-olive-gold hover:text-white transition-all duration-200"
          >
            💧 Beginner Routine
          </button>
          <button
            onClick={() => setInputMessage("Tell me about retinol")}
            className="px-3 py-1.5 text-xs bg-blush-beige text-deep-umber rounded-full hover:bg-olive-gold hover:text-white transition-all duration-200"
          >
            ✨ About Retinol
          </button>
          <button
            onClick={() => setInputMessage("How to treat acne?")}
            className="px-3 py-1.5 text-xs bg-blush-beige text-deep-umber rounded-full hover:bg-olive-gold hover:text-white transition-all duration-200"
          >
            🧴 Acne Help
          </button>
        </div>
      </div>

      {/* Chat History Modal */}
      <ChatHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onLoadHistory={loadHistoryMessages}
      />
    </div>
  );
};

export default ChatWindow;
