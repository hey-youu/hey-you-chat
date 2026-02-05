import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, Sparkles, ArrowRight } from "lucide-react";
import OnboardingSlide from "./OnboardingSlide";
import AuthScreen from "../auth/AuthScreen";
import ProfileSetup from "./ProfileSetup";

type OnboardingStep = "slides" | "auth" | "profile";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: <MessageCircle className="w-16 h-16" />,
    title: "Hey You!",
    description: "Welcome to conversations without limits. Chat freely with friends, family, and AI.",
    accentColor: "primary" as const,
  },
  {
    icon: <Users className="w-16 h-16" />,
    title: "Connect Together",
    description: "Create groups, share moments, and collaborate with collaborative todos and more.",
    accentColor: "secondary" as const,
  },
  {
    icon: <Sparkles className="w-16 h-16" />,
    title: "Free Forever",
    description: "No subscriptions, no limits, no barriers. Hey You! is free for everyone.",
    accentColor: "accent" as const,
  },
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<OnboardingStep>("slides");
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep("auth");
    }
  };

  const handleAuthSuccess = () => {
    setStep("profile");
  };

  const handleProfileComplete = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col h-screen bg-canvas">
      <AnimatePresence mode="wait">
        {step === "slides" && (
          <motion.div
            key="slides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <OnboardingSlide key={slideIndex} {...slides[slideIndex]} />
              </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="px-8 pb-12">
              {/* Dots */}
              <div className="flex justify-center gap-2 mb-8">
                {slides.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === slideIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextSlide}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-elevated flex items-center justify-center gap-2"
              >
                {slideIndex < slides.length - 1 ? "Next" : "Get Started"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Skip */}
              {slideIndex < slides.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setStep("auth")}
                  className="w-full mt-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {step === "auth" && (
          <AuthScreen
            key="auth"
            onSuccess={handleAuthSuccess}
            onBack={() => setStep("slides")}
          />
        )}

        {step === "profile" && (
          <ProfileSetup
            key="profile"
            onComplete={handleProfileComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
