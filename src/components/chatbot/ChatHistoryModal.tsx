import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ChatHistory {
  id: string;
  title: string;
  messages: any;
  created_at: string;
}

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadHistory: (messages: any[]) => void;
}

const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({ isOpen, onClose, onLoadHistory }) => {
  const [histories, setHistories] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && user) {
      fetchChatHistories();
    }
  }, [isOpen, user]);

  const fetchChatHistories = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_histories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistories(data || []);
    } catch (error) {
      console.error('Error fetching chat histories:', error);
      toast({
        title: "Error",
        description: "Failed to load chat histories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chat_histories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHistories(prev => prev.filter(h => h.id !== id));
      toast({
        title: "Deleted",
        description: "Chat history removed",
      });
    } catch (error) {
      console.error('Error deleting chat history:', error);
      toast({
        title: "Error",
        description: "Failed to delete chat history",
        variant: "destructive",
      });
    }
  };

  const loadHistory = (messages: any) => {
    const parsedMessages = Array.isArray(messages) ? messages : JSON.parse(messages || '[]');
    onLoadHistory(parsedMessages); // let ChatWindow handle timestamp conversion
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-olive-gold text-white p-4 flex items-center justify-between rounded-t-xl">
          <h3 className="font-semibold">Chat History</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-sm text-sage-grey">Loading chat histories...</div>
            </div>
          ) : histories.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-sage-grey mx-auto mb-2" />
              <div className="text-sm text-sage-grey">No chat histories yet</div>
            </div>
          ) : (
            <div className="space-y-2">
              {histories.map((history) => (
                <div
                  key={history.id}
                  className="border border-light-cream rounded-lg p-3 hover:bg-cream-white/50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => loadHistory(history.messages)}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium text-deep-umber truncate">
                        {history.title}
                      </div>
                      <div className="text-xs text-sage-grey mt-1">
                        {new Date(history.created_at).toLocaleDateString()}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteHistory(history.id)}
                      className="p-1 text-sage-grey hover:text-deep-umber opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryModal;
