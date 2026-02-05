import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Root Stack
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

// Auth Stack
export type AuthStackParamList = {
  PhoneInput: undefined;
  OTPVerification: { phoneNumber: string; countryCode: string };
  ProfileSetup: { isNewUser: boolean };
};

// Main Stack (after auth)
export type MainStackParamList = {
  Home: undefined;
  ChatRoom: {
    chatId: string;
    contactName: string;
    contactAvatar?: string;
    isOnline?: boolean;
  };
  ContactProfile: { userId: string };
  MyProfile: undefined;
  Settings: undefined;
  NewChat: undefined;
  NewGroup: undefined;
  QRScanner: undefined;
  MyQRCode: undefined;
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

// Home tabs
export type HomeTabParamList = {
  Chats: undefined;
  Groups: undefined;
  Contacts: undefined;
};
