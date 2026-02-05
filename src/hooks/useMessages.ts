import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sending" | "sent" | "delivered" | "read";
  senderId: string;
  senderName?: string;
}

export function useMessages(chatId: string | undefined, userId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    if (!chatId || !userId) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          content,
          created_at,
          sender_id,
          message_type,
          media_url
        `)
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Get sender profiles
      const senderIds = [...new Set(data?.map((m) => m.sender_id) || [])];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", senderIds);

      const formattedMessages: Message[] = (data || []).map((msg) => {
        const senderProfile = profiles?.find((p) => p.user_id === msg.sender_id);
        return {
          id: msg.id,
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: msg.sender_id === userId,
          status: "read" as const,
          senderId: msg.sender_id,
          senderName: senderProfile?.display_name || undefined,
        };
      });

      setMessages(formattedMessages);

      // Update last_read_at for current user
      await supabase
        .from("chat_participants")
        .update({ last_read_at: new Date().toISOString() })
        .eq("chat_id", chatId)
        .eq("user_id", userId);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Failed to load messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [chatId, userId, toast]);

  const sendMessage = async (content: string) => {
    if (!chatId || !userId || !content.trim()) return;

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempMessage: Message = {
      id: tempId,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      status: "sending",
      senderId: userId,
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          sender_id: userId,
          content: content.trim(),
          message_type: "text",
        })
        .select()
        .single();

      if (error) throw error;

      // Replace temp message with real one
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                id: data.id,
                status: "sent" as const,
              }
            : msg
        )
      );

      // Update chat's updated_at
      await supabase
        .from("chats")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", chatId);
    } catch (error: any) {
      console.error("Error sending message:", error);
      // Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();

    if (!chatId) return;

    // Subscribe to new messages in this chat
    const channel = supabase
      .channel(`messages-${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        async (payload) => {
          const newMsg = payload.new as any;
          
          // Skip if we already have this message (our own sent message)
          if (messages.some((m) => m.id === newMsg.id)) return;

          // Get sender profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", newMsg.sender_id)
            .maybeSingle();

          const formattedMessage: Message = {
            id: newMsg.id,
            content: newMsg.content,
            timestamp: new Date(newMsg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSent: newMsg.sender_id === userId,
            status: "read",
            senderId: newMsg.sender_id,
            senderName: profile?.display_name || undefined,
          };

          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, formattedMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, userId, fetchMessages]);

  return { messages, isLoading, sendMessage, refetch: fetchMessages };
}
