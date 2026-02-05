import { motion } from "framer-motion";
import { MessageCircle, Users } from "lucide-react";

interface EmptyStateProps {
  type: "chat" | "group";
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const Icon = type === "chat" ? MessageCircle : Users;
  const title = type === "chat" ? "Hey You! Start a conversation 💬" : "Hey You! Create a group 👥";
  const description =
    type === "chat"
      ? "Tap the + button to start chatting with someone"
      : "Bring your friends together in a group chat";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center h-full px-8 py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center w-20 h-20 rounded-full bg-soft mb-6"
      >
        <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
      </motion.div>

      <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </motion.div>
  );
};

export default EmptyState;
