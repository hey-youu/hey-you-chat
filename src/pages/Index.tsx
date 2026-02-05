import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GrainTexture from "@/components/GrainTexture";
import NavigationBar from "@/components/NavigationBar";
import ChatListItem from "@/components/ChatListItem";
import EmptyState from "@/components/EmptyState";
import ChatRoom from "@/components/ChatRoom";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import ActionModal from "@/components/modals/ActionModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { mockChats, mockGroups, mockMessages, type Chat, type Message } from "@/data/mockData";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem("heyou-onboarded") === "true";
  });
  const [activeTab, setActiveTab] = useState<"chat" | "group">("chat");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("heyou-onboarded", "true");
    setIsOnboarded(true);
  };

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

  const handleAction = (action: string) => {
    console.log("Action triggered:", action);
    // Handle different actions here
  };

  const handleLogout = () => {
    localStorage.removeItem("heyou-onboarded");
    setIsOnboarded(false);
    setIsSettingsModalOpen(false);
  };

  const currentList = activeTab === "chat" ? mockChats : mockGroups;

  // Show splash screen first
  if (showSplash) {
    return (
      <>
        <GrainTexture />
        <SplashScreen />
      </>
    );
  }

  // Show onboarding if not completed
  if (!isOnboarded) {
    return (
      <>
        <GrainTexture />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </>
    );
  }

  return (
    <>
      <GrainTexture />

      <AnimatePresence mode="wait">
        {selectedChat ? (
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
              onPlusClick={() => setIsActionModalOpen(true)}
              onMenuClick={() => setIsSettingsModalOpen(true)}
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
                          onClick={() => activeTab === "chat" && setSelectedChat(item as Chat)}
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

      {/* Modals */}
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onAction={handleAction}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Index;
