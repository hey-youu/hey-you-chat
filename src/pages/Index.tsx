import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GrainTexture from "@/components/GrainTexture";
import NavigationBar from "@/components/NavigationBar";
import ChatListItem from "@/components/ChatListItem";
import EmptyState from "@/components/EmptyState";
import ChatRoom from "@/components/ChatRoom";
import SplashScreen from "@/components/SplashScreen";

// Mock data for demonstration
const mockChats = [
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

const mockGroups = [
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

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sending" | "sent" | "delivered" | "read";
}

const mockMessages: Message[] = [
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

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "group">("chat");
  const [selectedChat, setSelectedChat] = useState<typeof mockChats[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const currentList = activeTab === "chat" ? mockChats : mockGroups;

  return (
    <>
      <GrainTexture />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : selectedChat ? (
          <motion.div
            key="chatroom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen"
          >
            <ChatRoom
              contactName={selectedChat.name}
              isOnline={selectedChat.isOnline}
              messages={messages}
              onBack={() => setSelectedChat(null)}
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-screen bg-canvas"
          >
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-6 pt-6 pb-4"
            >
              <h1 className="font-heading text-3xl font-bold text-primary">
                Hey You!
              </h1>
              <p className="text-muted-foreground mt-1">
                {activeTab === "chat" ? "Your conversations" : "Your groups"}
              </p>
            </motion.header>

            {/* Navigation */}
            <NavigationBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onPlusClick={() => console.log("New chat")}
              onMenuClick={() => console.log("Menu")}
            />

            {/* Content */}
            <main className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {currentList.length === 0 ? (
                  <EmptyState key={activeTab} type={activeTab} />
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: activeTab === "chat" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === "chat" ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-y-auto px-2 py-2 scrollbar-hide"
                  >
                    {currentList.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ChatListItem
                          {...item}
                          onClick={() => activeTab === "chat" && setSelectedChat(item as typeof mockChats[0])}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Bottom Safe Area */}
            <div className="h-6 bg-canvas" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
