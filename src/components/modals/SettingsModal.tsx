import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Settings, Palette, Bell, Lock, Info, LogOut, 
  ChevronRight, Moon, Sun, Smartphone
} from "lucide-react";
import { useState } from "react";
import Avatar from "../Avatar";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const menuItems = [
  { id: "profile", icon: User, label: "Profile", description: "Edit your info" },
  { id: "settings", icon: Settings, label: "Settings", description: "App preferences" },
  { id: "appearance", icon: Palette, label: "Appearance", description: "Theme & colors" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Manage alerts" },
  { id: "privacy", icon: Lock, label: "Privacy", description: "Security settings" },
  { id: "about", icon: Info, label: "About", description: "App info & help" },
];

const SettingsModal = ({ isOpen, onClose, onLogout }: SettingsModalProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleMenuClick = (itemId: string) => {
    setActiveSection(itemId);
  };

  const handleBack = () => {
    setActiveSection(null);
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
            <div className="bg-surface rounded-3xl shadow-xl overflow-hidden max-w-lg mx-auto max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {activeSection ? menuItems.find(m => m.id === activeSection)?.label : "Menu"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={activeSection ? handleBack : onClose}
                  className="p-2 rounded-full hover:bg-soft transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!activeSection ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6"
                    >
                      {/* Profile Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 bg-soft rounded-2xl mb-6"
                      >
                        <Avatar alt="You" size="lg" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">
                            Your Name
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Hey You! user
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        {menuItems.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4 }}
                            onClick={() => handleMenuClick(item.id)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-soft transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-medium text-foreground">
                                {item.label}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </motion.button>
                        ))}
                      </div>

                      {/* Logout */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onLogout}
                        className="w-full mt-6 py-4 border border-destructive text-destructive rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Log Out
                      </motion.button>
                    </motion.div>
                  ) : activeSection === "appearance" ? (
                    <AppearanceSection key="appearance" />
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-6 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-soft flex items-center justify-center mx-auto mb-4">
                        {(() => {
                          const MenuItem = menuItems.find(m => m.id === activeSection);
                          if (MenuItem) {
                            return <MenuItem.icon className="w-10 h-10 text-muted-foreground" />;
                          }
                          return null;
                        })()}
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        Coming Soon
                      </h3>
                      <p className="text-muted-foreground">
                        This section is under construction. Stay tuned!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AppearanceSection = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Smartphone, label: "System" },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      <h3 className="font-medium text-foreground mb-4">Theme</h3>
      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme(t.id)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              theme === t.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <t.icon className={`w-6 h-6 mx-auto mb-2 ${
              theme === t.id ? "text-primary" : "text-muted-foreground"
            }`} />
            <span className={`text-sm font-medium ${
              theme === t.id ? "text-foreground" : "text-muted-foreground"
            }`}>
              {t.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Accent Colors */}
      <h3 className="font-medium text-foreground mt-8 mb-4">Accent Color</h3>
      <div className="flex gap-3">
        {[
          { name: "Mauve", class: "bg-primary" },
          { name: "Olive", class: "bg-secondary" },
          { name: "Terracotta", class: "bg-accent" },
          { name: "Mint", class: "bg-mint" },
        ].map((color, index) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full ${color.class} ${
              index === 0 ? "ring-2 ring-offset-2 ring-primary" : ""
            }`}
            title={color.name}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsModal;
