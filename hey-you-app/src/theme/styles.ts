import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from './tokens';

/**
 * Common styles used throughout the app
 */
export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Surfaces
  surface: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    ...shadows.soft,
  },
  card: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    ...shadows.soft,
  },

  // Typography
  h1: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h1,
    color: colors.text.primary,
    lineHeight: typography.fontSize.h1 * typography.lineHeight.tight,
  },
  h2: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h2,
    color: colors.text.primary,
    lineHeight: typography.fontSize.h2 * typography.lineHeight.tight,
  },
  h3: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.h3,
    color: colors.text.primary,
    lineHeight: typography.fontSize.h3 * typography.lineHeight.tight,
  },
  body: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal,
  },
  small: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.small * typography.lineHeight.normal,
  },
  caption: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.caption,
    color: colors.text.muted,
    lineHeight: typography.fontSize.caption * typography.lineHeight.normal,
  },

  // Brand text
  brandText: {
    fontFamily: typography.fontFamily.headingBold,
    fontSize: typography.fontSize.h1,
    color: colors.accent.mauve,
  },

  // Spacing helpers
  mt_xs: { marginTop: spacing.xs },
  mt_sm: { marginTop: spacing.sm },
  mt_md: { marginTop: spacing.md },
  mt_lg: { marginTop: spacing.lg },
  mt_xl: { marginTop: spacing.xl },
  mb_xs: { marginBottom: spacing.xs },
  mb_sm: { marginBottom: spacing.sm },
  mb_md: { marginBottom: spacing.md },
  mb_lg: { marginBottom: spacing.lg },
  mb_xl: { marginBottom: spacing.xl },
  mx_md: { marginHorizontal: spacing.md },
  my_md: { marginVertical: spacing.md },
  p_md: { padding: spacing.md },
  p_lg: { padding: spacing.lg },
  px_md: { paddingHorizontal: spacing.md },
  py_md: { paddingVertical: spacing.md },
});

/**
 * Message bubble styles
 */
export const messageStyles = StyleSheet.create({
  sent: {
    backgroundColor: colors.accent.mauve + 'E6', // 90% opacity
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '75%',
    alignSelf: 'flex-end',
    marginRight: spacing.sm,
    marginLeft: spacing.md,
    ...shadows.soft,
  },
  received: {
    backgroundColor: colors.bg.soft,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
    marginRight: spacing.md,
    ...shadows.soft,
  },
  sentText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.white,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal,
  },
  receivedText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal,
  },
  timestamp: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.tiny,
    marginTop: spacing.xs,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  receivedTimestamp: {
    color: colors.text.muted,
    textAlign: 'left',
  },
});
