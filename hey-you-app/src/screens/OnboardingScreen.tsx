import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { MessageCircle, Users, Sparkles, ArrowRight } from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../theme/tokens';
import { Button, GrainTexture } from '../components/ui';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    icon: <MessageCircle size={64} strokeWidth={1.5} />,
    title: 'Hey You! 👋',
    description: 'Welcome to conversations without limits. Chat freely with friends, family, and AI.',
    accentColor: colors.accent.mauve,
  },
  {
    id: '2',
    icon: <Users size={64} strokeWidth={1.5} />,
    title: 'Hey You, share anything',
    description: 'Photos, todos, designs, moments. Create groups, collaborate together.',
    accentColor: colors.accent.olive,
  },
  {
    id: '3',
    icon: <Sparkles size={64} strokeWidth={1.5} />,
    title: "Hey You, it's free forever",
    description: 'No subscriptions, no limits, no barriers. Hey You! is free for humans and AI.',
    accentColor: colors.accent.terracotta,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.slide,
          { width, opacity, transform: [{ scale }] },
        ]}
      >
        {/* Icon Container */}
        <View style={[styles.iconContainer, { backgroundColor: item.accentColor + '15' }]}>
          <View style={{ color: item.accentColor }}>
            {React.cloneElement(item.icon as React.ReactElement, {
              color: item.accentColor,
            })}
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <GrainTexture />

      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <View style={styles.slidesContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          scrollEventThrottle={16}
        />
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomContainer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 32, 8],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: colors.accent.mauve,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next Button */}
        <Button
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="large"
          icon={<ArrowRight size={20} color={colors.white} />}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  slidesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.body * typography.lineHeight.loose,
    maxWidth: 300,
  },
  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 48,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    width: '100%',
  },
});

export default OnboardingScreen;
