import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const saveChatHistory = useCallback(async (messages: Message[]) => {
    if (!user || messages.length <= 1) return; // Don't save empty or single-message chats

    setSaving(true);
    try {
      // Generate a title from the first user message
      const firstUserMessage = messages.find(m => m.isUser);
      const title = firstUserMessage ? 
        firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '') :
        'New Chat';

      // Check current chat count
      const { count } = await supabase
        .from('chat_histories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // If we have 8 or more chats, delete the oldest ones
      if (count && count >= 8) {
        const { data: oldChats } = await supabase
          .from('chat_histories')
          .select('id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(count - 7); // Keep only 7, delete the rest

        if (oldChats && oldChats.length > 0) {
          const idsToDelete = oldChats.map(chat => chat.id);
          await supabase
            .from('chat_histories')
            .delete()
            .in('id', idsToDelete);

          toast({
            title: "Chat History",
            description: "Oldest chats removed to make space for new conversations",
          });
        }
      }

      // Save the new chat
      const { error } = await supabase
        .from('chat_histories')
        .insert({
          user_id: user.id,
          title,
          messages: JSON.stringify(messages)
        });

      if (error) throw error;

    } catch (error) {
      console.error('Error saving chat history:', error);
    } finally {
      setSaving(false);
    }
  }, [user, toast]);

  return { saveChatHistory, saving };
};