import { motion } from "framer-motion";
import { Plus, MoreHorizontal } from "lucide-react";

interface NavigationBarProps {
  activeTab: "chat" | "group";
  onTabChange: (tab: "chat" | "group") => void;
  onPlusClick?: () => void;
  onMenuClick?: () => void;
}

const NavigationBar = ({
  activeTab,
  onTabChange,
  onPlusClick,
  onMenuClick,
}: NavigationBarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between px-4 py-3 bg-surface shadow-card"
    >
      {/* Left: Plus Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlusClick}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-soft transition-colors duration-200"
        aria-label="New chat"
      >
        <Plus className="w-5 h-5 text-primary" />
      </motion.button>

      {/* Center: Tab Switcher */}
      <div className="relative flex items-center bg-soft rounded-full p-1">
        {/* Active Tab Indicator */}
        <motion.div
          layoutId="activeTab"
          className="absolute inset-y-1 rounded-full bg-surface shadow-sm"
          style={{
            width: "calc(50% - 4px)",
            left: activeTab === "chat" ? "4px" : "calc(50% + 0px)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {/* Chat Tab */}
        <button
          onClick={() => onTabChange("chat")}
          className={`relative z-10 px-8 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            activeTab === "chat"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/80"
          }`}
        >
          Chat
        </button>

        {/* Group Tab */}
        <button
          onClick={() => onTabChange("group")}
          className={`relative z-10 px-8 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            activeTab === "group"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/80"
          }`}
        >
          Group
        </button>
      </div>

      {/* Right: Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-soft transition-colors duration-200"
        aria-label="Menu"
      >
        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
      </motion.button>
    </motion.nav>
  );
};

export default NavigationBar;
