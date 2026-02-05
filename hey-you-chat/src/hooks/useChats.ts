import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ChatWithDetails {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline?: boolean;
  isTyping?: boolean;
  avatar?: string;
  isGroup: boolean;
  participantIds: string[];
}

export function useChats(userId: string | undefined) {
  const [chats, setChats] = useState<ChatWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchChats = async () => {
    if (!userId) return;

    try {
      // Get all chats the user participates in
      const { data: participations, error: partError } = await supabase
        .from("chat_participants")
        .select("chat_id")
        .eq("user_id", userId);

      if (partError) throw partError;

      if (!participations || participations.length === 0) {
        setChats([]);
        setIsLoading(false);
        return;
      }

      const chatIds = participations.map((p) => p.chat_id);

      // Get chat details
      const { data: chatsData, error: chatsError } = await supabase
        .from("chats")
        .select("*")
        .in("id", chatIds)
        .order("updated_at", { ascending: false });

      if (chatsError) throw chatsError;

      // Get all participants for these chats
      const { data: allParticipants, error: allPartError } = await supabase
        .from("chat_participants")
        .select("chat_id, user_id, last_read_at")
        .in("chat_id", chatIds);

      if (allPartError) throw allPartError;

      // Get profiles for all participants (excluding current user)
      const otherUserIds = [...new Set(
        allParticipants
          ?.filter((p) => p.user_id !== userId)
          .map((p) => p.user_id) || []
      )];

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, is_online")
        .in("user_id", otherUserIds);

      if (profilesError) throw profilesError;

      // Get last message for each chat
      const { data: lastMessages, error: msgError } = await supabase
        .from("messages")
        .select("chat_id, content, created_at")
        .in("chat_id", chatIds)
        .order("created_at", { ascending: false });

      if (msgError) throw msgError;

      // Get unread counts
      const myParticipations = allParticipants?.filter((p) => p.user_id === userId) || [];

      // Build chat list with details
      const chatList: ChatWithDetails[] = (chatsData || []).map((chat) => {
        const chatParticipants = allParticipants?.filter((p) => p.chat_id === chat.id) || [];
        const otherParticipant = chatParticipants.find((p) => p.user_id !== userId);
        const otherProfile = profiles?.find((p) => p.user_id === otherParticipant?.user_id);
        
        const lastMessage = lastMessages?.find((m) => m.chat_id === chat.id);
        const myParticipation = myParticipations.find((p) => p.chat_id === chat.id);
        
        // Count unread messages (messages after last_read_at)
        const unreadCount = lastMessages?.filter(
          (m) => 
            m.chat_id === chat.id && 
            myParticipation?.last_read_at && 
            new Date(m.created_at) > new Date(myParticipation.last_read_at)
        ).length || 0;

        const displayName = chat.is_group 
          ? chat.name 
          : otherProfile?.display_name || "Unknown";

        return {
          id: chat.id,
          name: displayName || "Chat",
          lastMessage: lastMessage?.content || "No messages yet",
          timestamp: lastMessage 
            ? formatTimestamp(lastMessage.created_at) 
            : formatTimestamp(chat.created_at),
          unreadCount,
          isOnline: otherProfile?.is_online || false,
          avatar: chat.is_group ? chat.avatar_url || undefined : otherProfile?.avatar_url || undefined,
          isGroup: chat.is_group || false,
          participantIds: chatParticipants.map((p) => p.user_id),
        };
      });

      setChats(chatList);
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      toast({
        title: "Failed to load chats",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();

    // Subscribe to new messages to update chat list
    const channel = supabase
      .channel("chats-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchChats();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
        },
        () => {
          fetchChats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { chats, isLoading, refetch: fetchChats };
}

function formatTimestamp(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: "long" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}
