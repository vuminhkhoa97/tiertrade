# TierTrade - E-commerce Marketplace Platform

A modern, full-stack e-commerce marketplace platform built with Next.js and Express, featuring advanced filtering, pagination, and a beautiful user interface.

## 🚀 Tech Stack

### Frontend (Web Client)

- **Framework**: Next.js 15.2.4 (React 19.0.0)
- **Styling**: Tailwind CSS 3.4.3
- **UI Components**: Custom UI library with Headless UI
- **Icons**: Heroicons
- **Forms**: React Hook Form 7.57.0
- **HTTP Client**: Axios 1.9.0
- **TypeScript**: 5.8.2

### Backend (Web API)

- **Runtime**: Node.js with Express 4.21.2
- **Mock Database**: JSON Server 0.17.4
- **Build Tool**: Webpack with SWC

### Development & Build Tools

- **Monorepo**: Nx 21.2.0
- **Package Manager**: PNPM with Workspaces
- **Testing**: Jest 29.7.0 with Testing Library
- **Linting**: ESLint 9.8.0 with Prettier
- **TypeScript**: Full type safety across the stack

### Additional Libraries

- **State Management**: URL-based state with React Hook Form
- **Accessibility**: ARIA-compliant components
- **Performance**: Server-side rendering (SSR) with Next.js
- **Developer Experience**: Hot reloading, type checking, automated builds


### 🎨 User Interface
- **Dark/Light Theme**: Toggle between dark and light modes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Loading States**: Skeleton loading for better user experience

### 🏗️ Architecture Features

- **Monorepo Structure**: Organized codebase with Nx workspace
- **Component Library**: Reusable UI components across applications
- **Service Layer**: Abstracted API calls with proper error handling
- **Custom Hooks**: Reusable logic for common operations
- **Modular Design**: Clean separation of concerns

## 🛠️ How to Run Locally

### Prerequisites

- **Node.js**: Version 18 or higher
- **PNPM**: Latest version (recommended package manager)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tierTrade
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development servers**

   **Option 1: Start both frontend and backend together**

   ```bash
   pnpm start
   ```

   **Option 2: Start servers individually**

   ```bash
   # Terminal 1 - Start API server (Port 5005)
   pnpm start:api

   # Terminal 2 - Start web client (Port 3000)
   pnpm start:web
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **API**: http://localhost:5005

### Available Scripts

- `pnpm start` - Start both frontend and backend in development mode
- `pnpm start:web` - Start only the Next.js frontend
- `pnpm start:api` - Start only the Express API server
- `pnpm build:web` - Build web client for production
- `pnpm test:web` - run test web client for production
- `pnpm lint` - lint code

## 🏗️ How to Build App

### Development Build

```bash
# Build all projects
pnpm build:web

```
## Demo

🚀 **Live Demo**: [https://tiertrade.zonajiai.work](https://tiertrade.zonajiai.work)

> **Note**: The demo website may experience delays as it's hosted on a slower server. Please allow extra time for loading.

### Environment Variables

Create `.env.local` files for environment-specific configurations:

```bash
# apps/web-client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5005

# apps/web-api/.env
PORT=5005
```

## 📁 Project Structure

```
tierTrade/
├── apps/
│   ├── web-client/          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # Next.js app router
│   │   │   ├── components/  # React components
│   │   │   ├── services/    # API service layer
│   │   │   └── config/      # Configuration files
│   │   └── public/          # Static assets
│   └── web-api/             # Express.js backend API
│       ├── src/
│       │   ├── raw-data/    # JSON data files
│       │   └── main.ts      # API server entry point
├── libs/
│   └── ui/                  # Shared UI component library
│       └── src/lib/         # Reusable components
└── package.json             # Root package configuration
```

## 📋 TODO

### Upcoming Features

- [ ] **Responsive Design Improvements**: Enhance mobile experience and ensure optimal layout across all device sizes
- [ ] **Home Page**: Create an engaging landing page with featured products, hero sections, and promotional content
- [ ] **User Authentication**: Implement login functionality to enable user accounts and personalized features
- [ ] **Product Detail Page**: Build comprehensive product detail views with images, descriptions, reviews, and purchase options
- [ ] **Favorites System**: Allow logged-in users to save and manage their favorite products


**Built with ❤️ using modern web technologies**
