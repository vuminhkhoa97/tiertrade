# Dark Theme Configuration

This project now supports a comprehensive dark theme implementation using Tailwind CSS and semantic color tokens.

## Features

### 🌓 Theme Modes
- **Light mode**: Traditional light theme
- **Dark mode**: Dark theme with proper contrast
- **System mode**: Automatically follows system preference

### 🎨 Semantic Color System
The project uses semantic color tokens that automatically adapt to the current theme:

- `background` / `foreground`: Primary background and text colors
- `card` / `card-foreground`: Card backgrounds and text
- `popover` / `popover-foreground`: Dropdown and popover colors
- `primary` / `primary-foreground`: Primary button and accent colors
- `secondary` / `secondary-foreground`: Secondary button colors
- `muted` / `muted-foreground`: Muted backgrounds and subtle text
- `accent` / `accent-foreground`: Hover states and highlights
- `destructive` / `destructive-foreground`: Error and danger states
- `border`: Border colors
- `input`: Input field borders
- `ring`: Focus ring colors

## Components Updated

### 🧩 UI Library Components (`libs/ui`)
- **Button**: All variants now support dark theme
- **Input**: Form inputs with dark theme support
- **Card**: Card components with semantic colors
- **Select**: Dropdown components with dark theme

### 🖼️ App Components
- **Header**: Updated with theme toggle and semantic colors
- **Footer**: Dark theme support for navigation and content
- **Main Layout**: Theme provider integration
- **Product Grid**: Skeleton loaders with semantic colors

## Usage

### Theme Toggle
A theme toggle button is available in the header that cycles through:
1. Light → Dark → System → Light (repeat)

### Theme Provider
The app is wrapped with `ThemeProvider` in the root layout:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Using Semantic Colors in Components
Instead of hardcoded colors like `bg-white` or `text-gray-900`, use semantic tokens:

```tsx
// ❌ Old way
<div className="bg-white text-gray-900 border-gray-200">

// ✅ New way
<div className="bg-background text-foreground border-border">
```

## Theme Configuration

### Tailwind Config
- `darkMode: 'class'` enables class-based dark mode
- Semantic color tokens defined in `theme.extend.colors`
- CSS variables for dynamic color switching

### CSS Variables
All colors are defined as CSS custom properties in `global.css`:
- Light theme: `:root { --background: ... }`
- Dark theme: `.dark { --background: ... }`

## Browser Support
- Automatically detects system theme preference
- Persists user's theme choice in localStorage
- Smooth transitions between themes
- Hydration-safe (no flash of incorrect theme)

## Development Notes
- Theme state is managed by React Context
- Theme persistence handled automatically
- All components should use semantic color tokens
- Theme toggle component is client-side only
