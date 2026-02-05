import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Video, CheckSquare, FileText, Palette, MapPin, Mic } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

const actions = [
  { id: "photo", icon: Image, label: "Photo", color: "bg-primary/10 text-primary" },
  { id: "video", icon: Video, label: "Video", color: "bg-accent/10 text-accent" },
  { id: "todo", icon: CheckSquare, label: "Todo", color: "bg-secondary/10 text-secondary" },
  { id: "document", icon: FileText, label: "Document", color: "bg-mint/20 text-foreground" },
  { id: "design", icon: Palette, label: "Design", color: "bg-primary/10 text-primary" },
  { id: "location", icon: MapPin, label: "Location", color: "bg-accent/10 text-accent" },
  { id: "voice", icon: Mic, label: "Voice", color: "bg-secondary/10 text-secondary" },
];

const ActionModal = ({ isOpen, onClose, onAction }: ActionModalProps) => {
  const handleAction = (actionId: string) => {
    onAction(actionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8"
          >
            <div className="bg-surface rounded-3xl shadow-xl overflow-hidden max-w-lg mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Create
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-soft transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-4 gap-4 p-6">
                {actions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(action.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction("new-chat")}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-sm"
                >
                  Start New Chat
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActionModal;
