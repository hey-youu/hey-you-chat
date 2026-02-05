# Hey You! - React Native App (Expo)

## Project Overview
Messaging app with watercolor aesthetic. Built with Expo (React Native) + TypeScript.

## Quick Commands

```bash
# Start development server
npx expo start

# Start web version
npx expo start --web --port 12000

# Build for production
eas build --profile production --platform all

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI: Button, Input, Avatar, GrainTexture
│   └── chat/        # Chat components: ChatListItem
├── screens/
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   └── auth/
│       ├── PhoneInputScreen.tsx
│       ├── OTPScreen.tsx
│       └── ProfileSetupScreen.tsx
├── theme/
│   ├── tokens.ts    # Design tokens (colors, spacing, typography)
│   └── styles.ts    # Common styles
├── types/
│   └── navigation.ts
└── hooks/
    └── (custom hooks)
```

## Design Tokens

All styles use tokens from `src/theme/tokens.ts`:

```typescript
// Colors
colors.bg.canvas    // #F6F4F1 - main background
colors.bg.surface   // #FFFFFF - cards
colors.accent.mauve // #7A6EAA - primary brand
colors.accent.mint  // #A7C4B8 - success/online

// Spacing
spacing.xs  // 4
spacing.sm  // 8
spacing.md  // 16
spacing.lg  // 24
spacing.xl  // 40

// Typography
typography.fontFamily.heading    // Fraunces
typography.fontFamily.body       // Inter
typography.fontSize.h2           // 32
typography.fontSize.body         // 16
```

## Current App Flow

1. **SplashScreen** (2.5s) → 
2. **OnboardingScreen** (3 slides) → 
3. **PhoneInputScreen** (country picker + phone input) → 
4. **OTPScreen** (5-digit verification) → 
5. **ProfileSetupScreen** (avatar + name + bio) → 
6. **HomeScreen** (Chat/Group tabs + list)

## Key Dependencies

- expo: SDK 54+
- react-native-reanimated
- react-native-gesture-handler
- lucide-react-native (icons)
- expo-image-picker
- socket.io-client (for backend)

## TODO

- [ ] ChatRoom screen
- [ ] Backend integration (Railway)
- [ ] Real OTP via Twilio
- [ ] Real-time messaging via Socket.io
- [ ] Push notifications

## Notes

- Using state machine navigation (not React Navigation yet)
- Design follows DESIGN_GUIDELINES.md exactly
- OTP currently accepts any 5 digits for testing
