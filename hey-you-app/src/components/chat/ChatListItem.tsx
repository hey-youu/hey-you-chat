import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, radius, shadows, components } from '../../theme/tokens';
import { Avatar } from '../ui';

interface ChatListItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  avatar?: string | null;
  isTyping?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline,
  avatar,
  isTyping,
  isPinned,
  isMuted,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <Avatar
        source={avatar}
        name={name}
        size="medium"
        isOnline={isOnline}
        showOnlineIndicator={true}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Top Row: Name + Timestamp */}
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>

        {/* Bottom Row: Message Preview + Badge */}
        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.lastMessage,
              isTyping && styles.typingText,
            ]}
            numberOfLines={1}
          >
            {isTyping ? 'typing...' : lastMessage}
          </Text>

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs / 2,
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    ...shadows.soft,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
  },
  timestamp: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.caption,
    color: colors.text.muted,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  lastMessage: {
    flex: 1,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  typingText: {
    fontStyle: 'italic',
    color: colors.accent.mauve,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent.mauve,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.caption,
    color: colors.white,
  },
});

export default ChatListItem;
