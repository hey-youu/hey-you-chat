import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, radius, typography, shadows, components, animation } from '../../theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  const loaderColor = variant === 'primary' ? colors.white : colors.accent.mauve;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <>{icon}</>
          )}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <>{icon}</>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    gap: spacing.sm,
  },

  // Variants
  primaryContainer: {
    backgroundColor: colors.accent.mauve,
    ...shadows.soft,
  },
  secondaryContainer: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.accent.mauve,
  },
  ghostContainer: {
    backgroundColor: colors.transparent,
  },

  // Sizes
  smallContainer: {
    height: components.button.height.small,
    paddingHorizontal: spacing.md,
  },
  mediumContainer: {
    height: components.button.height.medium,
    paddingHorizontal: components.button.paddingHorizontal,
  },
  largeContainer: {
    height: components.button.height.large,
    paddingHorizontal: spacing.lg,
  },

  // Text
  text: {
    fontFamily: typography.fontFamily.bodyMedium,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.accent.mauve,
  },
  ghostText: {
    color: colors.text.primary,
  },
  smallText: {
    fontSize: typography.fontSize.small,
  },
  mediumText: {
    fontSize: typography.fontSize.body,
  },
  largeText: {
    fontSize: 18,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
