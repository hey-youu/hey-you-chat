import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { colors, spacing, typography, shadows } from '../theme/tokens';
import { GrainTexture } from '../components/ui';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for loading dots
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Navigate after delay
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <GrainTexture />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Icon */}
        <View style={styles.logoContainer}>
          <View style={styles.iconBox}>
            <MessageCircle
              size={48}
              color={colors.white}
              strokeWidth={1.5}
            />
          </View>
          {/* Decorative ring */}
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: pulseAnim }],
                opacity: Animated.subtract(1, pulseAnim).interpolate({
                  inputRange: [-0.2, 0],
                  outputRange: [0, 0.3],
                }),
              },
            ]}
          />
        </View>

        {/* Brand Text */}
        <Text style={styles.brandText}>Hey You!</Text>
        <Text style={styles.tagline}>Hey You, let's talk!</Text>
      </Animated.View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <LoadingDots />
      </View>
    </View>
  );
};

const LoadingDots: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0.5)).current;
  const dot2 = useRef(new Animated.Value(0.5)).current;
  const dot3 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = animateDot(dot1, 0);
    const anim2 = animateDot(dot2, 200);
    const anim3 = animateDot(dot3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View style={styles.dotsContainer}>
      {[dot1, dot2, dot3].map((dot, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: dot,
              transform: [
                {
                  scale: dot.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [1, 1.3],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: colors.accent.mauve,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.elevated,
  },
  ring: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.accent.mauve,
  },
  brandText: {
    fontFamily: typography.fontFamily.headingBold,
    fontSize: 48,
    color: colors.accent.mauve,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 64,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.mauve,
  },
});

export default SplashScreen;
