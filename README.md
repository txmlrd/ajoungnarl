# 📰 Ajoungnarl

Ajoungnarl (ajung-journal) is a modern, full-featured blog platform inspired by the elegance of classic newspapers. Built with **React**, **Firebase**, and **Tailwind CSS v4**, featuring user authentication, post management, and real-time interactions.

---

## ✨ Key Features

### 🔐 **User Authentication & Profiles**

- **Sign up/Sign in** — Firebase Authentication with email/password
- **User Profiles** — Customizable profiles with bio, profile pictures, and social media links
- **Profile Settings** — Image cropping, social media integration (Instagram, LinkedIn, TikTok)
- **Membership System** — Free/Premium member status

### 📝 **Content Management**

- **Rich Text Editor** — Quill.js integration for advanced content creation
- **Post Creation** — Add posts with images, tags, and categories
- **Blog Posts** — Full CRUD operations for blog content
- **Image Handling** — Upload, crop, and display images with fallbacks

### 💬 **Interactive Features**

- **Comments System** — Real-time commenting on posts with moderation
- **User Profiles** — View author profiles and their latest posts
- **Post Categories & Tags** — Organized content classification
- **Search & Discovery** — Find posts and authors easily

### 🎨 **Modern UI/UX**

- **Newspaper-inspired Design** — Clean, elegant typography-first approach
- **Mobile-first Responsive** — Optimized for all screen sizes
- **Smooth Animations** — Lenis scroll, hover effects, and transitions
- **Loading States** — Skeleton screens and loading indicators
- **Error Handling** — 404 pages, image fallbacks, and user feedback

### 🚀 **Performance & Developer Experience**

- **Fast Development** — Vite with hot reload
- **Lazy Loading** — Code splitting and route-based loading
- **Modern Stack** — React 19, Firebase v12, Tailwind CSS v4
- **Type Safety** — PropTypes validation
- **Code Quality** — ESLint configuration

---

## 🏗️ Architecture Overview

### **Frontend Stack**

- **React 19** — Modern React with hooks and context
- **React Router** — Client-side routing with lazy loading
- **Tailwind CSS v4** — Utility-first styling with custom design system
- **Ant Design** — UI components for modals, alerts, and forms
- **Lucide React** — Modern icon library

### **Backend & Database**

- **Firebase Authentication** — Secure user management
- **Firestore Database** — NoSQL database for posts, users, and comments
- **Real-time Updates** — Live comment updates and user status

### **State Management**

- **React Context** — Global state for authentication and alerts
- **Custom Hooks** — Reusable logic for posts, users, and comments
- **Local State** — Component-level state management

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)
- Firebase project with Firestore and Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/txmlrd/ajoungnarl.git

# Move into the project folder
cd ajoungnarl

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development

```bash
# Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 📂 Project Structure

```
mini-blog/
├── public/                     # Static assets
│   ├── logo.svg               # App logo and branding
│   ├── image-not-found.png    # Fallback images
│   └── google.svg             # Social login assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── HomePage/          # Home page specific components
│   │   ├── DetailPost/        # Post detail components
│   │   ├── UserProfile/       # User profile components
│   │   ├── ProfileSettings/   # Settings components
│   │   ├── Signin/           # Authentication components
│   │   └── Signup/
│   ├── pages/                # Route pages
│   │   ├── Home.jsx          # Homepage layout
│   │   ├── DetailPost.jsx    # Individual post view
│   │   ├── UserProfile.jsx   # User profile page
│   │   ├── AddPost.jsx       # Post creation/editing
│   │   └── 404NotFound.jsx   # Error handling
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── AlertContext.jsx  # Global notifications
│   ├── hooks/                # Custom React hooks
│   │   ├── usePosts.jsx      # Post data management
│   │   ├── useUserProfile.jsx # User profile logic
│   │   └── useAddComment.jsx # Comment functionality
│   ├── lib/                  # External services
│   │   ├── firebase.js       # Firebase configuration
│   │   └── firebaseErrorMessage.js # Error handling
│   ├── helper/               # Utility components
│   │   ├── LazyLoad.jsx      # Code splitting utility
│   │   ├── LoadingFallback.jsx # Loading states
│   │   └── ScrollToTop.jsx   # Navigation helper
│   ├── function/             # Pure utility functions
│   │   └── timeAgo.jsx       # Date formatting
│   └── data/                 # Static data
│       └── membershipStatusData.js # User roles
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind customization
└── vercel.json             # Deployment configuration
```

---

## 🔥 Core Features Deep Dive

### **User Journey**

1. **Landing** — Hero section with featured articles
2. **Authentication** — Sign up/Sign in with Firebase
3. **Browse** — Explore posts by category, tags, or search
4. **Read** — Detailed post view with comments
5. **Interact** — Comment on posts, view author profiles
6. **Create** — Rich text editor for creating posts (authenticated users)
7. **Profile** — Manage personal profile and view own posts

### **Database Schema (Firestore)**

```
users/
├── {userId}/
│   ├── name, email, bio, role, pictureProfile
│   ├── userSlug, phoneNumber
│   ├── createdAt, updatedAt
│   └── socialmedia/ (subcollection)
│       └── instagram, linkedin, tiktok

posts/
├── {postId}/
│   ├── title, content, image, readTime
│   ├── author, idAuthor, userSlug
│   ├── tagIds[], createdAt
│   └── comments/ (subcollection)
│       └── comment, user, createdAt

tags/
├── {tagId}/
│   └── name
```

### **Key Components**

- **Header** — Navigation with auth status and mobile menu
- **QuillEditor** — Rich text editor with HTML preview
- **ImageCrop** — Profile picture cropping functionality
- **Comments System** — Real-time comment display and creation
- **UserProfile** — Comprehensive user profile management
- **LazyLoad** — Performance optimization for routes

---

## 🎨 Design System

### **Typography**

- **Headers/Logo** — Cormorant Garamond (serif)
- **Body/Content** — Merriweather (serif)
- **UI Elements** — Clean, newspaper-inspired hierarchy

### **Color Palette**

- **Primary** — Black (`#000000`)
- **Secondary** — Gray shades for subtle elements
- **Background** — Clean white with strategic use of borders
- **Accent** — Minimal color usage for better readability

### **Components**

- **Buttons** — Consistent hover states and loading indicators
- **Forms** — Clean input styling with validation feedback
- **Cards** — Post cards with hover animations
- **Navigation** — Responsive hamburger menu for mobile

---

## 🚢 Deployment

The app is configured for **Vercel** deployment with SPA routing support:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "buildCommand": "npm install --legacy-peer-deps && npm run build"
}
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

---

## �️ Development Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📸 Preview

🎨 [View Design Mockups on Figma](https://www.figma.com/design/VAypj9KFZNp3abBdy8juuq/ajoungnarl?node-id=0-1&t=10m1vqK3C9nufLao-1)

---

**Made with ❤️ by [ajung](https://github.com/txmlrd), 2025.**
