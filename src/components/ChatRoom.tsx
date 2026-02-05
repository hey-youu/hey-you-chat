import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react";
import Avatar from "./Avatar";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface ChatRoomProps {
  contactName: string;
  contactAvatar?: string;
  isOnline?: boolean;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string) => void;
}

const ChatRoom = ({
  contactName,
  contactAvatar,
  isOnline,
  messages,
  onBack,
  onSendMessage,
}: ChatRoomProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-canvas"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface shadow-card">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-soft transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </motion.button>

        <Avatar src={contactAvatar} alt={contactName} size="sm" isOnline={isOnline} />

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground truncate">{contactName}</h2>
          <p className="text-xs text-muted-foreground">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-soft transition-colors"
          >
            <Phone className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-soft transition-colors"
          >
            <Video className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-soft transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-surface border-t border-border">
        <div className="flex items-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full hover:bg-soft transition-colors"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              rows={1}
              className="w-full px-4 py-2.5 bg-soft rounded-2xl resize-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full hover:bg-soft transition-colors"
          >
            <Smile className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatRoom;
