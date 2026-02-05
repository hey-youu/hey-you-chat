import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, User, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupProps {
  onComplete: () => void;
}

const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!displayName.trim()) {
      toast({
        title: "Please enter a name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({ 
            display_name: displayName.trim(),
            avatar_url: avatar || undefined,
          })
          .eq("user_id", user.id);

        if (error) throw error;
      }

      onComplete();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full px-6 bg-canvas"
    >
      {/* Header */}
      <div className="pt-12 pb-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold text-foreground mb-2"
        >
          Set up your profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Add a photo and name so friends can find you
        </motion.p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-8">
        {/* Avatar Upload */}
        <motion.label
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative cursor-pointer mb-8"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <div className="w-32 h-32 rounded-full bg-soft border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
          >
            <Camera className="w-5 h-5" />
          </motion.div>
        </motion.label>

        {/* Display Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="How should we call you?"
            className="w-full px-4 py-4 bg-soft rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
            maxLength={30}
          />
          <p className="mt-2 text-xs text-muted-foreground text-right">
            {displayName.length}/30
          </p>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Alex", "Jordan", "Sam", "Taylor"].map((name) => (
              <motion.button
                key={name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDisplayName(name)}
                className="px-4 py-2 bg-soft rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                {name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="pb-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!displayName.trim() || isLoading}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-elevated flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Check className="w-5 h-5" />
              Complete Setup
            </>
          )}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onComplete}
          className="w-full mt-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Skip for now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileSetup;
