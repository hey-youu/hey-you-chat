import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, components } from '../../theme/tokens';

type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  showOnlineIndicator?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = '',
  size = 'medium',
  isOnline,
  showOnlineIndicator = true,
  style,
}) => {
  const sizeValue = components.avatar[size];
  const initials = getInitials(name);

  const containerStyle = [
    styles.container,
    {
      width: sizeValue,
      height: sizeValue,
      borderRadius: sizeValue / 2,
    },
    style,
  ];

  const initialsSize = sizeValue * 0.4;
  const indicatorSize = size === 'small' ? 10 : size === 'medium' ? 12 : 16;

  return (
    <View style={containerStyle}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={[styles.image, { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 }]}
        />
      ) : (
        <View style={[styles.fallback, { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 }]}>
          <Text style={[styles.initials, { fontSize: initialsSize }]}>
            {initials}
          </Text>
        </View>
      )}

      {showOnlineIndicator && isOnline !== undefined && (
        <View
          style={[
            styles.indicator,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: isOnline ? colors.accent.mint : colors.text.muted,
              borderWidth: size === 'large' ? 3 : 2,
            },
          ]}
        />
      )}
    </View>
  );
};

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: colors.bg.soft,
  },
  fallback: {
    backgroundColor: colors.bg.soft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontFamily: typography.fontFamily.headingSemiBold,
    color: colors.accent.mauve,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: colors.bg.surface,
  },
});

export default Avatar;
