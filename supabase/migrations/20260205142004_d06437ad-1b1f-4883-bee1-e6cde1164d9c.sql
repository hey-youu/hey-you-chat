-- Fix the permissive RLS policy for chat creation
DROP POLICY "Users can create chats" ON public.chats;

-- Only authenticated users can create chats
CREATE POLICY "Authenticated users can create chats" ON public.chats
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);