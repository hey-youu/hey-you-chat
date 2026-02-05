import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { colors, spacing, typography, radius, shadows } from '../../theme/tokens';
import { Button, GrainTexture } from '../../components/ui';

const OTP_LENGTH = 5;
const RESEND_TIMER = 60; // seconds

interface OTPScreenProps {
  phoneNumber: string;
  countryCode: string;
  onBack: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  phoneNumber,
  countryCode,
  onBack,
  onVerify,
  onResend,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_TIMER);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatPhone = () => {
    return `${countryCode} ${phoneNumber.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow single digit
    const digit = text.replace(/\D/g, '').slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (index === OTP_LENGTH - 1 && digit) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === OTP_LENGTH) {
        handleVerify(fullOtp);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo: any OTP works, in production verify with backend
      if (code === '12345' || code.length === OTP_LENGTH) {
        onVerify(code);
      } else {
        triggerShake();
        setError('Invalid code. Try again');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleResend = () => {
    setTimer(RESEND_TIMER);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    onResend();
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <View style={styles.container}>
      <GrainTexture />

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
          <ShieldCheck size={40} color={colors.accent.mauve} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Hey You!</Text>
        <Text style={styles.subtitle}>Verify your number</Text>

        {/* Phone Display */}
        <Text style={styles.phoneText}>
          Enter the code sent to{'\n'}
          <Text style={styles.phoneNumber}>{formatPhone()}</Text>
        </Text>

        {/* OTP Input */}
        <Animated.View
          style={[
            styles.otpContainer,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
                error && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </Animated.View>

        {/* Error */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Timer / Resend */}
        <View style={styles.timerContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in {formatTime(timer)}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Verify"
          onPress={() => handleVerify(otp.join(''))}
          disabled={!isOtpComplete}
          loading={isLoading}
          size="large"
          style={styles.verifyButton}
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
    alignItems: 'center',
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
    marginBottom: spacing.lg,
  },
  phoneText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  phoneNumber: {
    fontFamily: typography.fontFamily.bodyMedium,
    color: colors.text.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  otpInput: {
    width: 56,
    height: 56,
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.text.muted,
    textAlign: 'center',
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: 24,
    color: colors.text.primary,
  },
  otpInputFilled: {
    borderColor: colors.accent.mauve,
  },
  otpInputError: {
    borderColor: colors.state.error,
  },
  errorText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.state.error,
    marginTop: spacing.sm,
  },
  timerContainer: {
    marginTop: spacing.lg,
  },
  timerText: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.small,
    color: colors.text.secondary,
  },
  resendText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.small,
    color: colors.accent.mauve,
  },
  bottomContainer: {
    padding: spacing.lg,
    paddingBottom: 48,
  },
  verifyButton: {
    width: '100%',
  },
});

export default OTPScreen;
