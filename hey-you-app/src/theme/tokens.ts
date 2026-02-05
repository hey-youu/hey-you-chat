/**
 * Hey You! Design Tokens
 * Based on DESIGN_GUIDELINES.md - Watercolor Aesthetic
 */

export const colors = {
  // Background Colors
  bg: {
    canvas: '#F6F4F1',
    surface: '#FFFFFF',
    soft: '#EEEAE5',
  },

  // Text Colors
  text: {
    primary: '#2E2E2E',
    secondary: '#6B6B6B',
    muted: '#9A9A9A',
  },

  // Accent Colors
  accent: {
    mauve: '#7A6EAA',
    olive: '#8A8C68',
    terracotta: '#C47A5A',
    mint: '#A7C4B8',
  },

  // State Colors
  state: {
    success: '#7FAF9B',
    warning: '#E1B07E',
    error: '#D17C7C',
  },

  // Transparent
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    heading: 'Fraunces',
    headingBold: 'Fraunces-Bold',
    headingSemiBold: 'Fraunces-SemiBold',
    body: 'Inter',
    bodyMedium: 'Inter-Medium',
    bodySemiBold: 'Inter-SemiBold',
  },
  fontSize: {
    h1: 48,
    h2: 32,
    h3: 24,
    body: 16,
    small: 14,
    caption: 12,
    tiny: 11,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.7,
  },
} as const;

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  hover: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  elevated: {
    shadowColor: colors.accent.mauve,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export const animation = {
  duration: {
    fast: 120,
    normal: 280,
    slow: 500,
  },
  easing: {
    standard: [0.4, 0.0, 0.2, 1] as const,
    enter: 'ease-out',
    exit: 'ease-in',
  },
  scale: {
    pressed: 0.98,
    hover: 1.02,
  },
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      small: 36,
      medium: 44,
      large: 56,
    },
    paddingHorizontal: spacing.md + 4, // 20
  },
  input: {
    height: 56,
    paddingHorizontal: spacing.md,
  },
  avatar: {
    small: 36,
    medium: 48,
    large: 120,
  },
  navBar: {
    height: 60,
  },
  chatItem: {
    height: 80,
    avatarSize: 48,
  },
  message: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modal: {
    borderRadius: radius.lg,
  },
} as const;

// Export all tokens as a single object
export const tokens = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  animation,
  components,
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Typography = typeof typography;
export type Shadows = typeof shadows;
export type Animation = typeof animation;
export type Components = typeof components;
export type Tokens = typeof tokens;
