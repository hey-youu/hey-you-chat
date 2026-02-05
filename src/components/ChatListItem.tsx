import { motion } from "framer-motion";
import Avatar from "./Avatar";

interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isTyping?: boolean;
  onClick?: () => void;
}

const ChatListItem = ({
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount,
  isOnline,
  isTyping,
  onClick,
}: ChatListItemProps) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "hsl(var(--soft))" }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 text-left transition-colors duration-200 rounded-xl"
    >
      <Avatar src={avatar} alt={name} isOnline={isOnline} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-sm text-muted-foreground truncate">
            {isTyping ? (
              <span className="text-primary italic">typing...</span>
            ) : (
              lastMessage
            )}
          </p>
          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default ChatListItem;
