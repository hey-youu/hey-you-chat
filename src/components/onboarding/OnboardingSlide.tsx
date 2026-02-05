import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OnboardingSlideProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor?: "primary" | "secondary" | "accent" | "mint";
}

const OnboardingSlide = ({
  icon,
  title,
  description,
  accentColor = "primary",
}: OnboardingSlideProps) => {
  const accentClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    mint: "text-mint",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center px-8 text-center"
    >
      {/* Icon Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className={`w-32 h-32 rounded-full bg-soft flex items-center justify-center mb-8 ${accentClasses[accentColor]}`}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-heading text-3xl font-bold text-foreground mb-4"
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-lg max-w-xs leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default OnboardingSlide;
