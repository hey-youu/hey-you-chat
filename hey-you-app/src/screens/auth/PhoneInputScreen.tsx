import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ArrowLeft, ChevronDown, Phone } from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../../theme/tokens';
import { Button, Input, GrainTexture } from '../../components/ui';

// Common country codes
const COUNTRIES = [
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
];

interface PhoneInputScreenProps {
  onBack: () => void;
  onContinue: (phoneNumber: string, countryCode: string) => void;
}

export const PhoneInputScreen: React.FC<PhoneInputScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [error, setError] = useState('');

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    
    // Format: XXX-XXXX-XXXX for Indonesia
    if (selectedCountry.code === '+62') {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    
    // Format: (XXX) XXX-XXXX for US
    if (selectedCountry.code === '+1') {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    setError('');
  };

  const validatePhone = () => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 8) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validatePhone()) {
      const digits = phoneNumber.replace(/\D/g, '');
      onContinue(digits, selectedCountry.code);
    }
  };

  const selectCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
    setPhoneNumber('');
  };

  const isValidPhone = phoneNumber.replace(/\D/g, '').length >= 8;

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
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Phone size={40} color={colors.accent.mauve} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Hey You!</Text>
          <Text style={styles.subtitle}>Enter your phone number</Text>

          {/* Country Picker */}
          <TouchableOpacity
            style={styles.countryPicker}
            onPress={() => setShowCountryPicker(!showCountryPicker)}
          >
            <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
            <Text style={styles.countryCode}>{selectedCountry.code}</Text>
            <ChevronDown size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          {/* Country Dropdown */}
          {showCountryPicker && (
            <View style={styles.countryDropdown}>
              {COUNTRIES.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryOption,
                    selectedCountry.code === country.code && styles.countryOptionSelected,
                  ]}
                  onPress={() => selectCountry(country)}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryCodeSmall}>{country.code}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Phone Input */}
          <Input
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            error={error}
            leftIcon={<Phone size={20} color={colors.text.muted} />}
            containerStyle={styles.inputContainer}
          />

          {/* Helper Text */}
          <Text style={styles.helperText}>
            We'll send you an OTP to verify your number
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isValidPhone}
            size="large"
            style={styles.continueButton}
          />
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
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent.mauve + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.headingSemiBold,
    fontSize: typography.fontSize.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  countryFlag: {
    fontSize: 24,
  },
  countryCode: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
    flex: 1,
  },
  countryDropdown: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  countryOptionSelected: {
    backgroundColor: colors.accent.mauve + '10',
  },
  countryName: {
    flex: 1,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
  },
  countryCodeSmall: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  helperText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.muted,
    textAlign: 'center',
  },
  bottomContainer: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  continueButton: {
    width: '100%',
  },
});

export default PhoneInputScreen;
