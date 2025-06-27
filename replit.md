# Political Orientation Quiz Application

## Overview

This is a full-stack web application that analyzes users' political orientation through a 12-question balance game. The application uses AI (Google's Gemini) to provide personalized analysis based on user responses and demographics. Built with React frontend, Express backend, and configured for deployment on Replit.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React useState hooks with TanStack Query for server state
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with single endpoint for political analysis
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle but schema not yet implemented)
- **ORM**: Drizzle ORM with Neon Database serverless driver
- **Session Storage**: In-memory storage (MemStorage class) for development
- **Schema Validation**: Zod for runtime type checking and validation

## Key Components

### Frontend Components
1. **Welcome Page** (`client/src/pages/welcome.tsx`)
   - Demographic data collection
   - Game introduction and instructions
   - User preferences capture (age, gender, region)

2. **Quiz Page** (`client/src/pages/quiz.tsx`)
   - Interactive balance game interface
   - Progress tracking
   - Auto-advance after selection
   - Responsive design for mobile/desktop

3. **Results Page** (`client/src/pages/results.tsx`)
   - AI-generated political orientation analysis
   - Visual representation of results
   - Category-based breakdown
   - Multiple sharing options: general sharing, KakaoTalk sharing, restart

4. **Loading Screen** (`client/src/components/loading-screen.tsx`)
   - AI analysis progress indicator
   - User feedback during processing

### Backend Services
1. **Gemini AI Service** (`server/services/gemini.ts`)
   - Google Generative AI integration
   - Political orientation analysis
   - Contextual interpretation based on Korean politics
   - Category-wise analysis (economy, security, social issues, etc.)

2. **Storage Layer** (`server/storage.ts`)
   - Abstract storage interface
   - In-memory implementation for development
   - Prepared for database integration

### Shared Schema
- **Type Definitions** (`shared/schema.ts`)
  - User demographics schema
  - Quiz answer validation
  - Political orientation result types
  - Zod-based runtime validation

## Data Flow

1. **User Onboarding**: Demographic data collection on welcome page
2. **Quiz Interaction**: 12 questions with weighted responses (-1 to +1 scale)
3. **Data Processing**: Quiz answers sent to backend API endpoint
4. **AI Analysis**: Gemini processes responses with demographic context
5. **Result Generation**: Structured analysis returned with percentages and insights
6. **Result Display**: Visual presentation with category breakdowns and sharing options

## External Dependencies

### AI Integration
- **Google Generative AI**: Political orientation analysis using Gemini model
- **API Key**: Required via `GEMINI_API_KEY` or `GOOGLE_API_KEY` environment variable

### Social Sharing
- **KakaoTalk SDK**: Native Korean messaging app integration
- **JavaScript SDK**: Version 2.7.2 loaded via CDN
- **App Key Setup**: Requires Kakao Developer account and JavaScript key
- **Configuration**: See `KAKAO_SETUP.md` for detailed setup instructions

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Via `DATABASE_URL` environment variable
- **Migration**: Drizzle Kit for schema management

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Fast build tool and dev server
- **TanStack Query**: Server state management
- **Wouter**: Lightweight routing
- **TypeScript**: Type safety and developer experience

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 and PostgreSQL 16 modules
- **Development Server**: Vite dev server on port 5000
- **Hot Reload**: Enabled with Vite HMR

### Production Build
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Static Assets**: Served via Express static middleware
- **Process**: `npm run build` creates production bundle

### Deployment Configuration
- **Target**: Replit Autoscale deployment
- **Port Mapping**: Internal 5000 → External 80
- **Environment**: Production mode with optimized builds
- **Database**: PostgreSQL connection via environment variables

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 27, 2025. Initial setup
- June 27, 2025. Added KakaoTalk sharing functionality with SDK integration