import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { PhoneInputScreen } from './src/screens/auth/PhoneInputScreen';
import { OTPScreen } from './src/screens/auth/OTPScreen';
import { ProfileSetupScreen } from './src/screens/auth/ProfileSetupScreen';
import HomeScreen from './src/screens/HomeScreen';

type AppState = 'splash' | 'onboarding' | 'phoneInput' | 'otp' | 'profileSetup' | 'home';

interface AuthData {
  phoneNumber: string;
  countryCode: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [authData, setAuthData] = useState<AuthData>({ phoneNumber: '', countryCode: '+62' });

  // Navigation handlers
  const handleSplashFinish = useCallback(() => {
    // TODO: Check if user is already logged in
    setAppState('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setAppState('phoneInput');
  }, []);

  const handlePhoneBack = useCallback(() => {
    setAppState('onboarding');
  }, []);

  const handlePhoneContinue = useCallback((phoneNumber: string, countryCode: string) => {
    setAuthData({ phoneNumber, countryCode });
    // TODO: Call API to send OTP
    console.log('Sending OTP to:', countryCode + phoneNumber);
    setAppState('otp');
  }, []);

  const handleOTPBack = useCallback(() => {
    setAppState('phoneInput');
  }, []);

  const handleOTPVerify = useCallback((otp: string) => {
    // TODO: Verify OTP with backend
    console.log('Verifying OTP:', otp);
    setAppState('profileSetup');
  }, []);

  const handleOTPResend = useCallback(() => {
    // TODO: Resend OTP
    console.log('Resending OTP to:', authData.countryCode + authData.phoneNumber);
  }, [authData]);

  const handleProfileComplete = useCallback((profile: { name: string; bio?: string; avatar?: string }) => {
    // TODO: Save profile to backend
    console.log('Profile completed:', profile);
    setAppState('home');
  }, []);

  const handleProfileSkip = useCallback(() => {
    setAppState('home');
  }, []);

  // Render current screen based on state
  const renderScreen = () => {
    switch (appState) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case 'phoneInput':
        return (
          <PhoneInputScreen
            onBack={handlePhoneBack}
            onContinue={handlePhoneContinue}
          />
        );
      
      case 'otp':
        return (
          <OTPScreen
            phoneNumber={authData.phoneNumber}
            countryCode={authData.countryCode}
            onBack={handleOTPBack}
            onVerify={handleOTPVerify}
            onResend={handleOTPResend}
          />
        );
      
      case 'profileSetup':
        return (
          <ProfileSetupScreen
            onComplete={handleProfileComplete}
            onSkip={handleProfileSkip}
          />
        );
      
      case 'home':
        return <HomeScreen />;
      
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {renderScreen()}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
