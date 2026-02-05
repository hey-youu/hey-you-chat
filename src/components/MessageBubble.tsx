import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  showTail?: boolean;
}

const MessageBubble = ({
  content,
  timestamp,
  isSent,
  status = "sent",
  showTail = true,
}: MessageBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "max-w-[75%] px-4 py-2.5",
        isSent ? "message-sent ml-auto" : "message-received mr-auto"
      )}
    >
      <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
        {content}
      </p>
      <div
        className={cn(
          "flex items-center gap-1 mt-1",
          isSent ? "justify-end" : "justify-start"
        )}
      >
        <span
          className={cn(
            "text-[11px]",
            isSent ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {timestamp}
        </span>
        {isSent && (
          <span className="text-primary-foreground/70">
            {status === "read" ? (
              <CheckCheck className="w-3.5 h-3.5" />
            ) : status === "delivered" ? (
              <CheckCheck className="w-3.5 h-3.5 opacity-50" />
            ) : (
              <Check className="w-3.5 h-3.5 opacity-50" />
            )}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
