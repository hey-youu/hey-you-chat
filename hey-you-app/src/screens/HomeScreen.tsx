import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Plus, MoreHorizontal, MessageCircle, Users } from 'lucide-react-native';
import { colors, spacing, typography, radius, shadows, components } from '../theme/tokens';
import { Avatar, GrainTexture } from '../components/ui';
import ChatListItem from '../components/chat/ChatListItem';

// Mock data for demo
const MOCK_CHATS = [
  {
    id: '1',
    name: 'Jane Doe',
    lastMessage: "Hey! How are you doing today?",
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
    avatar: null,
    isGroup: false,
  },
  {
    id: '2',
    name: 'John Smith',
    lastMessage: 'Sounds good! See you later.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    avatar: null,
    isGroup: false,
  },
  {
    id: '3',
    name: 'Design Team',
    lastMessage: 'Alice: Check out the new mockups!',
    timestamp: '11:45 AM',
    unreadCount: 5,
    isOnline: true,
    avatar: null,
    isGroup: true,
  },
  {
    id: '4',
    name: 'Mom',
    lastMessage: 'Call me when you get home 💕',
    timestamp: 'Mon',
    unreadCount: 0,
    isOnline: true,
    avatar: null,
    isGroup: false,
  },
  {
    id: '5',
    name: 'Project Alpha',
    lastMessage: 'Meeting scheduled for tomorrow',
    timestamp: 'Sun',
    unreadCount: 0,
    isOnline: false,
    avatar: null,
    isGroup: true,
  },
];

type TabType = 'chat' | 'group';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [tabIndicatorLeft] = useState(new Animated.Value(0));

  const chats = activeTab === 'chat' 
    ? MOCK_CHATS.filter(c => !c.isGroup)
    : MOCK_CHATS.filter(c => c.isGroup);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    Animated.spring(tabIndicatorLeft, {
      toValue: tab === 'chat' ? 0 : 1,
      friction: 8,
      tension: 50,
      useNativeDriver: false,
    }).start();
  };

  const handleChatPress = (chatId: string) => {
    console.log('Opening chat:', chatId);
    // TODO: Navigate to ChatRoom
  };

  const handlePlusPress = () => {
    console.log('Open action modal');
    // TODO: Open ActionModal
  };

  const handleMenuPress = () => {
    console.log('Open settings modal');
    // TODO: Open SettingsModal
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        {activeTab === 'chat' ? (
          <MessageCircle size={40} color={colors.accent.mauve} strokeWidth={1.5} />
        ) : (
          <Users size={40} color={colors.accent.mauve} strokeWidth={1.5} />
        )}
      </View>
      <Text style={styles.emptyTitle}>
        {activeTab === 'chat' ? 'Hey You! Start a conversation 💬' : 'Hey You! Create a group 👥'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === 'chat'
          ? 'Tap the + button to start chatting with someone'
          : 'Bring your friends together in a group chat'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <GrainTexture />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandText}>Hey You!</Text>
        <Text style={styles.headerSubtitle}>
          {activeTab === 'chat' ? 'Your conversations' : 'Your groups'}
        </Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        {/* Plus Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handlePlusPress}>
          <Plus size={24} color={colors.accent.mauve} />
        </TouchableOpacity>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                left: tabIndicatorLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['4%', '50%'],
                }),
              },
            ]}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabChange('chat')}
          >
            <Text style={[styles.tabText, activeTab === 'chat' && styles.tabTextActive]}>
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabChange('group')}
          >
            <Text style={[styles.tabText, activeTab === 'group' && styles.tabTextActive]}>
              Group
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Button */}
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <MoreHorizontal size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            id={item.id}
            name={item.name}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
            unreadCount={item.unreadCount}
            isOnline={item.isOnline}
            avatar={item.avatar}
            onPress={() => handleChatPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Bottom Safe Area */}
      <View style={styles.bottomSafe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  brandText: {
    fontFamily: typography.fontFamily.headingBold,
    fontSize: typography.fontSize.h2 + 4,
    color: colors.accent.mauve,
  },
  headerSubtitle: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg.surface,
    ...shadows.soft,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.text.muted + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bg.soft,
    borderRadius: radius.pill,
    padding: 4,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    width: '46%',
    height: '100%',
    backgroundColor: colors.bg.surface,
    borderRadius: radius.pill - 4,
    ...shadows.soft,
  },
  tab: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    zIndex: 1,
  },
  tabText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  tabTextActive: {
    fontFamily: typography.fontFamily.bodyMedium,
    color: colors.text.primary,
  },
  listContent: {
    padding: spacing.sm,
    paddingBottom: spacing.xl,
  },
  bottomSafe: {
    height: spacing.lg,
    backgroundColor: colors.bg.canvas,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.bg.soft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});

export default HomeScreen;
