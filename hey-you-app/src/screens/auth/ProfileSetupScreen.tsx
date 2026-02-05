import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Camera, User, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography, radius } from '../../theme/tokens';
import { Button, GrainTexture } from '../../components/ui';

const MAX_NAME_LENGTH = 50;
const MAX_BIO_LENGTH = 150;

interface ProfileSetupScreenProps {
  onComplete: (profile: { name: string; bio?: string; avatar?: string }) => void;
  onSkip: () => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access photos is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete({
        name: name.trim(),
        bio: bio.trim() || undefined,
        avatar: avatar || undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nameSuggestions = ['Alex', 'Jordan', 'Sam', 'Taylor'];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <GrainTexture />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Set up your profile</Text>
          <Text style={styles.subtitle}>
            Add a photo and name so friends can find you
          </Text>

          {/* Avatar */}
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={64} color={colors.text.muted} />
              </View>
            )}
            <View style={styles.cameraButton}>
              <Camera size={20} color={colors.white} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Display Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text.slice(0, MAX_NAME_LENGTH))}
              placeholder="How should we call you?"
              placeholderTextColor={colors.text.muted}
              maxLength={MAX_NAME_LENGTH}
            />
            <Text style={styles.charCount}>
              {name.length}/{MAX_NAME_LENGTH}
            </Text>
          </View>

          {/* Quick Suggestions */}
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsLabel}>Quick suggestions:</Text>
            <View style={styles.suggestionsList}>
              {nameSuggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion}
                  style={styles.suggestionChip}
                  onPress={() => setName(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bio Input (Optional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bio (optional)</Text>
            <TextInput
              style={[styles.textInput, styles.bioInput]}
              value={bio}
              onChangeText={(text) => setBio(text.slice(0, MAX_BIO_LENGTH))}
              placeholder="Tell us about yourself..."
              placeholderTextColor={colors.text.muted}
              maxLength={MAX_BIO_LENGTH}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>
              {bio.length}/{MAX_BIO_LENGTH}
            </Text>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <Button
            title="Complete Setup"
            onPress={handleSubmit}
            disabled={!name.trim()}
            loading={isLoading}
            size="large"
            icon={<Check size={20} color={colors.white} />}
            style={styles.completeButton}
          />

          <TouchableOpacity style={styles.skipButtonBottom} onPress={onSkip}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.canvas,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: 'flex-end',
  },
  skipText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatarPlaceholder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.bg.soft,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.text.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent.mauve,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addPhotoText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.small,
    color: colors.accent.mauve,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.small,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  textInput: {
    width: '100%',
    height: 56,
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
  },
  bioInput: {
    height: 100,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  charCount: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.caption,
    color: colors.text.muted,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  suggestions: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  suggestionsLabel: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.muted,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  suggestionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg.soft,
    borderRadius: radius.pill,
  },
  suggestionText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  bottomContainer: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  completeButton: {
    width: '100%',
  },
  skipButtonBottom: {
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  skipButtonText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.muted,
  },
});

export default ProfileSetupScreen;
