-- Create chat_histories table for storing user chat sessions
CREATE TABLE public.chat_histories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_histories ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own chat histories" 
ON public.chat_histories 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat histories" 
ON public.chat_histories 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat histories" 
ON public.chat_histories 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat histories" 
ON public.chat_histories 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_chat_histories_updated_at
BEFORE UPDATE ON public.chat_histories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();