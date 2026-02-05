export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline?: boolean;
  isTyping?: boolean;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sending" | "sent" | "delivered" | "read";
}

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMessage: "Hey! Are you coming to the meeting?",
    timestamp: "2:34 PM",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Alex Rivera",
    lastMessage: "The project looks amazing! 🎉",
    timestamp: "1:15 PM",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "3",
    name: "Jordan Lee",
    lastMessage: "Let me check and get back to you",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Morgan Taylor",
    lastMessage: "Thanks for your help!",
    timestamp: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "5",
    name: "Casey Kim",
    lastMessage: "See you tomorrow!",
    timestamp: "Monday",
    unreadCount: 0,
    isOnline: true,
    isTyping: true,
  },
];

export const mockGroups: Chat[] = [
  {
    id: "g1",
    name: "Design Team",
    lastMessage: "New mockups are ready for review",
    timestamp: "3:00 PM",
    unreadCount: 5,
  },
  {
    id: "g2",
    name: "Weekend Plans",
    lastMessage: "Who's up for hiking?",
    timestamp: "12:30 PM",
    unreadCount: 0,
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    content: "Hey! How are you doing?",
    timestamp: "2:30 PM",
    isSent: false,
    status: "read",
  },
  {
    id: "m2",
    content: "I'm doing great! Just finished working on the new design. What about you?",
    timestamp: "2:31 PM",
    isSent: true,
    status: "read",
  },
  {
    id: "m3",
    content: "That sounds awesome! I'd love to see it. Are you coming to the meeting later?",
    timestamp: "2:33 PM",
    isSent: false,
    status: "read",
  },
  {
    id: "m4",
    content: "Yes, I'll be there! See you at 4 ✨",
    timestamp: "2:34 PM",
    isSent: true,
    status: "delivered",
  },
];
