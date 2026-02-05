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
import { supabase } from "@/integrations/supabase/client";
import { useChats, type ChatWithDetails } from "@/hooks/useChats";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "group">("chat");
  const [selectedChat, setSelectedChat] = useState<ChatWithDetails | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const userId = session?.user?.id;
  const { chats, isLoading: chatsLoading } = useChats(userId);

  // Filter chats by type
  const directChats = chats.filter((c) => !c.isGroup);
  const groupChats = chats.filter((c) => c.isGroup);
  const currentList = activeTab === "chat" ? directChats : groupChats;

  // Check auth session
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
  };

  const handleAction = (action: string) => {
    console.log("Action triggered:", action);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsSettingsModalOpen(false);
  };

  // Show splash screen first
  if (showSplash) {
    return (
      <>
        <GrainTexture />
        <SplashScreen />
      </>
    );
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <>
        <GrainTexture />
        <div className="flex items-center justify-center h-screen bg-canvas">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      </>
    );
  }

  // Show onboarding if not logged in
  if (!session) {
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
              chatId={selectedChat.id}
              contactName={selectedChat.name}
              contactAvatar={selectedChat.avatar}
              isOnline={selectedChat.isOnline}
              userId={userId}
              onBack={() => setSelectedChat(null)}
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
                {chatsLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    />
                  </motion.div>
                ) : currentList.length === 0 ? (
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
                          id={item.id}
                          name={item.name}
                          lastMessage={item.lastMessage}
                          timestamp={item.timestamp}
                          unreadCount={item.unreadCount}
                          isOnline={item.isOnline}
                          avatar={item.avatar}
                          onClick={() => setSelectedChat(item)}
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
