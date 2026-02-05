import { supabase } from "@/integrations/supabase/client";

export async function createDirectChat(userId: string, otherUserId: string): Promise<string | null> {
  try {
    // Check if a direct chat already exists between these users
    const { data: existingParticipations } = await supabase
      .from("chat_participants")
      .select("chat_id")
      .eq("user_id", userId);

    if (existingParticipations && existingParticipations.length > 0) {
      const chatIds = existingParticipations.map((p) => p.chat_id);
      
      // Check if the other user is in any of these chats (and it's not a group)
      for (const chatId of chatIds) {
        const { data: chat } = await supabase
          .from("chats")
          .select("id, is_group")
          .eq("id", chatId)
          .eq("is_group", false)
          .maybeSingle();

        if (chat) {
          const { data: otherParticipant } = await supabase
            .from("chat_participants")
            .select("id")
            .eq("chat_id", chatId)
            .eq("user_id", otherUserId)
            .maybeSingle();

          if (otherParticipant) {
            return chatId;
          }
        }
      }
    }

    // Create new chat
    const { data: newChat, error: chatError } = await supabase
      .from("chats")
      .insert({ is_group: false })
      .select()
      .single();

    if (chatError) throw chatError;

    // Add both participants
    const { error: partError } = await supabase
      .from("chat_participants")
      .insert([
        { chat_id: newChat.id, user_id: userId },
        { chat_id: newChat.id, user_id: otherUserId },
      ]);

    if (partError) throw partError;

    return newChat.id;
  } catch (error) {
    console.error("Error creating chat:", error);
    return null;
  }
}

export async function createGroupChat(
  userId: string,
  name: string,
  memberIds: string[]
): Promise<string | null> {
  try {
    // Create group chat
    const { data: newChat, error: chatError } = await supabase
      .from("chats")
      .insert({ is_group: true, name })
      .select()
      .single();

    if (chatError) throw chatError;

    // Add all participants (including creator as admin)
    const participants = [
      { chat_id: newChat.id, user_id: userId, is_admin: true },
      ...memberIds.map((id) => ({
        chat_id: newChat.id,
        user_id: id,
        is_admin: false,
      })),
    ];

    const { error: partError } = await supabase
      .from("chat_participants")
      .insert(participants);

    if (partError) throw partError;

    return newChat.id;
  } catch (error) {
    console.error("Error creating group chat:", error);
    return null;
  }
}
