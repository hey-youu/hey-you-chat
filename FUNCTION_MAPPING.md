# Hey You! Chat - Complete Function Mapping

> **Generated from Lovable Web Project (hey-you-chat)**  
> **Target: React Native with Expo + Railway Backend + OTP Auth**

---

## 📊 Project Overview

| Category | Count | Status |
|----------|-------|--------|
| Components | 14 custom + 40+ UI | Partial migrated |
| Hooks | 4 | Need rewrite |
| Services | 1 | Need rewrite |
| Database Tables | 5 | Schema ready |
| Auth | Email/Password | **NEED: OTP/Phone** |

---

## 🗂️ FILE STRUCTURE

```
hey-you-chat/src/
├── App.tsx                 # Main app with routing
├── main.tsx               # Entry point
├── index.css              # Design tokens & styles
│
├── pages/
│   ├── Index.tsx          # Main page controller
│   └── NotFound.tsx       # 404 page
│
├── components/
│   ├── Avatar.tsx         # User avatar with online status
│   ├── ChatListItem.tsx   # Chat list item
│   ├── ChatRoom.tsx       # Chat conversation view
│   ├── EmptyState.tsx     # Empty state placeholder
│   ├── GrainTexture.tsx   # Aesthetic overlay
│   ├── MessageBubble.tsx  # Message component
│   ├── NavLink.tsx        # Navigation link
│   ├── NavigationBar.tsx  # Tab navigation
│   ├── SplashScreen.tsx   # App splash screen
│   │
│   ├── auth/
│   │   └── AuthScreen.tsx # Email/Password auth ⚠️ REPLACE
│   │
│   ├── modals/
│   │   ├── ActionModal.tsx    # Create actions modal
│   │   └── SettingsModal.tsx  # Settings menu
│   │
│   └── onboarding/
│       ├── OnboardingFlow.tsx  # Flow controller
│       ├── OnboardingSlide.tsx # Slide component
│       └── ProfileSetup.tsx    # Profile setup
│
├── hooks/
│   ├── useChats.ts        # Fetch & subscribe chats
│   ├── useMessages.ts     # Fetch & send messages
│   ├── use-toast.ts       # Toast notifications
│   └── use-mobile.tsx     # Mobile detection
│
├── lib/
│   ├── chatService.ts     # Chat CRUD operations
│   └── utils.ts           # Utility functions
│
└── integrations/supabase/
    ├── client.ts          # Supabase client
    └── types.ts           # Database types
```

---

## 📦 COMPONENTS DETAIL

### 1. SplashScreen.tsx
```typescript
// Props
interface SplashScreenProps {
  onComplete?: () => void;
}

// Features
- Animated logo with MessageCircle icon
- Brand text "Hey You!"
- Loading dots animation
- Decorative ring animations
- Duration: ~2.5s (controlled by parent)

// Dependencies
- framer-motion
- lucide-react (MessageCircle)

// Status: ✅ MIGRATED to React Native
```

### 2. Avatar.tsx
```typescript
// Props
interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";  // 40px, 48px, 64px
  isOnline?: boolean;
  fallback?: string;
  className?: string;
}

// Features
- Image or initial fallback
- Online status indicator (green dot)
- 3 size variants

// Status: ✅ MIGRATED to React Native
```

### 3. ChatListItem.tsx
```typescript
// Props
interface ChatListItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isTyping?: boolean;
  onClick?: () => void;
}

// Features
- Avatar with online status
- Name and last message
- Timestamp
- Unread badge (max 99+)
- Typing indicator
- Hover/tap animations

// Status: ✅ MIGRATED to React Native
```

### 4. ChatRoom.tsx
```typescript
// Props
interface ChatRoomProps {
  chatId: string;
  contactName: string;
  contactAvatar?: string;
  isOnline?: boolean;
  userId: string;
  onBack: () => void;
}

// Features
- Header with back, avatar, name, status
- Action buttons (Phone, Video, More) - NOT FUNCTIONAL
- Message list with auto-scroll
- Input area with:
  - Attachment button (Paperclip) - NOT FUNCTIONAL
  - Text input
  - Emoji button (Smile) - NOT FUNCTIONAL
  - Send button
- Loading state
- Empty state

// Internal State
- inputValue: string
- messagesEndRef: RefObject

// Dependencies
- useMessages hook
- Avatar, MessageBubble components

// Status: 🔲 PENDING migration
```

### 5. MessageBubble.tsx
```typescript
// Props
interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  showTail?: boolean;
}

// Features
- Different styling for sent/received
- Status icons (Check, CheckCheck)
- Timestamp
- Entry animation

// Status: 🔲 PENDING migration
```

### 6. NavigationBar.tsx
```typescript
// Props
interface NavigationBarProps {
  activeTab: "chat" | "group";
  onTabChange: (tab: "chat" | "group") => void;
  onPlusClick?: () => void;
  onMenuClick?: () => void;
}

// Features
- Plus button (left) - opens ActionModal
- Tab switcher with animated indicator
- Menu button (right) - opens SettingsModal

// Status: 🔲 PENDING (different design for RN)
```

### 7. EmptyState.tsx
```typescript
// Props
interface EmptyStateProps {
  type: "chat" | "group";
}

// Features
- Different icon based on type
- Floating animation
- Helpful message

// Status: 🔲 PENDING
```

### 8. GrainTexture.tsx
```typescript
// Features
- SVG noise filter overlay
- Positioned fixed, pointer-events: none
- Opacity 3%

// Status: ✅ MIGRATED to React Native (simplified)
```

### 9. AuthScreen.tsx ⚠️ NEEDS REPLACEMENT
```typescript
// Props
interface AuthScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

// Current Features (EMAIL-BASED - REMOVE)
- Email/password login
- Sign up mode
- Form validation
- Supabase auth

// REPLACEMENT NEEDED:
- Phone input with country picker
- OTP verification
- Backend API integration (Railway)

// Status: ⚠️ REPLACE with PhoneInputScreen + OTPScreen
```

### 10. ProfileSetup.tsx
```typescript
// Props
interface ProfileSetupProps {
  onComplete: () => void;
}

// Features
- Avatar upload (file picker)
- Display name input (max 30 chars)
- Quick suggestions
- Skip option
- Save to Supabase profiles table

// Status: ✅ MIGRATED to React Native
```

### 11. OnboardingFlow.tsx
```typescript
// Props
interface OnboardingFlowProps {
  onComplete: () => void;
}

// Internal State
- step: "slides" | "auth" | "profile"
- slideIndex: number

// Slides Data
const slides = [
  { icon: MessageCircle, title: "Hey You!", description: "...", accentColor: "primary" },
  { icon: Users, title: "Connect Together", description: "...", accentColor: "secondary" },
  { icon: Sparkles, title: "Free Forever", description: "...", accentColor: "accent" },
];

// Flow
1. Slides (3 slides with pagination)
2. Auth (email/password - REPLACE)
3. Profile Setup

// Status: ✅ MIGRATED (flow changed to OTP-based)
```

### 12. ActionModal.tsx
```typescript
// Props
interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

// Actions Grid (NOT FUNCTIONAL)
const actions = [
  { id: "photo", icon: Image, label: "Photo" },
  { id: "video", icon: Video, label: "Video" },
  { id: "todo", icon: CheckSquare, label: "Todo" },
  { id: "document", icon: FileText, label: "Document" },
  { id: "design", icon: Palette, label: "Design" },
  { id: "location", icon: MapPin, label: "Location" },
  { id: "voice", icon: Mic, label: "Voice" },
];

// Quick Action
- "Start New Chat" button

// Status: 🔲 PENDING
```

### 13. SettingsModal.tsx
```typescript
// Props
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

// Menu Items (MOSTLY PLACEHOLDER)
const menuItems = [
  { id: "profile", icon: User, label: "Profile", description: "Edit your info" },
  { id: "settings", icon: Settings, label: "Settings", description: "App preferences" },
  { id: "appearance", icon: Palette, label: "Appearance", description: "Theme & colors" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Manage alerts" },
  { id: "privacy", icon: Lock, label: "Privacy", description: "Security settings" },
  { id: "about", icon: Info, label: "About", description: "App info & help" },
];

// Sub-section: AppearanceSection
- Theme toggle (light/dark/system)
- Accent color picker

// Functional
- Logout button

// Status: 🔲 PENDING
```

---

## 🪝 HOOKS DETAIL

### 1. useChats.ts
```typescript
// Signature
function useChats(userId: string | undefined)

// Returns
{
  chats: ChatWithDetails[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

// Interface
interface ChatWithDetails {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline?: boolean;
  isTyping?: boolean;
  avatar?: string;
  isGroup: boolean;
  participantIds: string[];
}

// Features
- Fetches all chats user participates in
- Gets chat details, participants, profiles
- Gets last message for each chat
- Calculates unread count
- Real-time subscription (postgres_changes)
- Formats timestamp (Today/Yesterday/Day/Date)

// Supabase Tables Used
- chat_participants
- chats
- profiles
- messages

// Status: 🔲 NEED REWRITE for Railway API
```

### 2. useMessages.ts
```typescript
// Signature
function useMessages(chatId: string | undefined, userId: string | undefined)

// Returns
{
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  refetch: () => Promise<void>;
}

// Interface
interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status: "sending" | "sent" | "delivered" | "read";
  senderId: string;
  senderName?: string;
}

// Features
- Fetches messages for a chat
- Gets sender profiles
- Optimistic message sending
- Updates last_read_at
- Real-time subscription for new messages
- Duplicate prevention

// Status: 🔲 NEED REWRITE for Railway API + WebSocket
```

### 3. use-toast.ts
```typescript
// Standard shadcn/ui toast hook
// Used for notifications

// Status: 🔲 REPLACE with react-native-toast-message
```

### 4. use-mobile.tsx
```typescript
// Mobile detection hook
// Not needed for React Native

// Status: ❌ NOT NEEDED
```

---

## 🔧 SERVICES DETAIL

### chatService.ts
```typescript
// Function 1
async function createDirectChat(
  userId: string, 
  otherUserId: string
): Promise<string | null>

// Logic
1. Check if direct chat already exists
2. If exists, return chat_id
3. If not, create new chat
4. Add both participants
5. Return new chat_id

// Function 2
async function createGroupChat(
  userId: string,
  name: string,
  memberIds: string[]
): Promise<string | null>

// Logic
1. Create group chat with name
2. Add creator as admin
3. Add all members
4. Return chat_id

// Status: 🔲 NEED REWRITE for Railway API
```

---

## 🗃️ DATABASE SCHEMA (Supabase)

### Tables

#### 1. profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  display_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### 2. chats
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_group BOOLEAN DEFAULT false,
  name TEXT,           -- For group chats
  avatar_url TEXT,     -- For group chats
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### 3. chat_participants
```sql
CREATE TABLE chat_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE,
  is_admin BOOLEAN DEFAULT false,
  UNIQUE(chat_id, user_id)
);
```

#### 4. messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' 
    CHECK (message_type IN ('text', 'image', 'video', 'voice', 'document', 'location')),
  media_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### 5. contacts
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, contact_user_id)
);
```

### RLS Policies Summary
- profiles: View all, update/insert own
- chats: View/update if participant, create if authenticated
- chat_participants: View if in chat, join/leave/update own
- messages: View/send if participant, update/delete own
- contacts: CRUD own contacts only

### Triggers
- `update_updated_at_column()` - Auto-update timestamps
- `handle_new_user()` - Auto-create profile on signup

### Realtime
- messages table enabled
- profiles table enabled

---

## 🎨 DESIGN TOKENS

### Colors (HSL values in CSS)
```css
/* Primary - Mauve */
--primary: 252 23% 54%;  /* #7A6EAA */

/* Secondary - Olive */
--secondary: 63 14% 48%; /* #7B8066 */

/* Accent - Terracotta */
--accent: 18 46% 56%;    /* #C48264 */

/* Mint */
--mint: 156 23% 71%;     /* #9BC4B4 */

/* Backgrounds */
--canvas: 30 20% 96%;    /* #F6F4F1 */
--surface: 0 0% 100%;    /* #FFFFFF */
--soft: 30 16% 92%;      /* #EDEBE7 */

/* Text */
--foreground: 0 0% 18%;  /* #2E2E2E */
--muted-foreground: 0 0% 42%; /* #6B6B6B */
```

### Typography
```css
/* Heading Font */
font-family: 'Fraunces', Georgia, serif;

/* Body Font */
font-family: 'Inter', system-ui, sans-serif;
```

### Shadows
```css
--shadow-card: 0 2px 8px -2px hsl(0 0% 0% / 0.04), 
               0 4px 16px -4px hsl(0 0% 0% / 0.06);
--shadow-elevated: 0 8px 24px -4px hsl(252 23% 54% / 0.15);
```

---

## ⚠️ CRITICAL ISSUES TO FIX

### 1. Authentication (HIGH PRIORITY)
```
CURRENT: Email + Password (Supabase Auth)
TARGET:  Phone + OTP (WhatsApp API / Twilio)

CHANGES NEEDED:
- Remove AuthScreen.tsx
- Add PhoneInputScreen (done in RN app)
- Add OTPScreen (done in RN app)
- Create Railway backend for OTP handling
- Integrate WhatsApp Business API or Twilio
```

### 2. Backend Migration (HIGH PRIORITY)
```
CURRENT: Direct Supabase calls
TARGET:  Railway backend API

CHANGES NEEDED:
- Create Railway Node.js/Express backend
- Implement JWT auth with phone verification
- Create REST API for all CRUD operations
- Add WebSocket for real-time messaging
- Keep Supabase as database only (or migrate to PostgreSQL on Railway)
```

### 3. Real-time Messaging (MEDIUM)
```
CURRENT: Supabase Realtime (postgres_changes)
TARGET:  WebSocket on Railway

CHANGES NEEDED:
- Socket.io server on Railway
- Connection management
- Message delivery confirmation
- Online status sync
```

### 4. Non-Functional Features (LOW)
```
NOT WORKING:
- Phone/Video call buttons
- Attachment (photo, video, voice, document)
- Location sharing
- Emoji picker
- Profile/Settings sections (Coming Soon)
- Theme persistence
- Notifications
```

---

## 📋 MIGRATION TASK LIST

### Phase 1: Core Screens (✅ DONE)
- [x] SplashScreen
- [x] OnboardingScreen (3 slides)
- [x] PhoneInputScreen
- [x] OTPScreen
- [x] ProfileSetupScreen
- [x] HomeScreen (chat list)

### Phase 2: Chat Features (🔲 PENDING)
- [ ] ContactListScreen
- [ ] ChatRoomScreen
- [ ] MessageBubble component
- [ ] Input bar with send
- [ ] Message status indicators

### Phase 3: Backend (🔲 PENDING)
- [ ] Railway project setup
- [ ] Express/Node.js API
- [ ] OTP service (Twilio/WhatsApp)
- [ ] JWT authentication
- [ ] Chat/Message CRUD endpoints
- [ ] WebSocket server

### Phase 4: Real-time (🔲 PENDING)
- [ ] Socket.io client integration
- [ ] Message subscription
- [ ] Online status
- [ ] Typing indicators

### Phase 5: Advanced Features (🔲 FUTURE)
- [ ] Group chat
- [ ] Media sharing
- [ ] Voice messages
- [ ] QR code scanner
- [ ] Notifications
- [ ] Settings screens

---

## 📝 API ENDPOINTS NEEDED (Railway)

```
POST   /api/auth/send-otp        # Send OTP to phone
POST   /api/auth/verify-otp      # Verify OTP, return JWT
POST   /api/auth/refresh-token   # Refresh JWT

GET    /api/profile              # Get current user profile
PUT    /api/profile              # Update profile
POST   /api/profile/avatar       # Upload avatar

GET    /api/contacts             # List contacts
POST   /api/contacts             # Add contact
DELETE /api/contacts/:id         # Remove contact

GET    /api/chats                # List user's chats
POST   /api/chats                # Create chat
GET    /api/chats/:id            # Get chat details
DELETE /api/chats/:id            # Leave/delete chat

GET    /api/chats/:id/messages   # Get messages (paginated)
POST   /api/chats/:id/messages   # Send message
PUT    /api/chats/:id/read       # Mark as read

# WebSocket events
connect                          # Authenticate with JWT
message:new                      # New message received
message:status                   # Delivery/read status
user:online                      # User online status
user:typing                      # Typing indicator
```

---

*Last updated: Session active*
*Branch: main-apps*
