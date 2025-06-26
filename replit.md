# NXT.ai - SaaS Platform

## Overview

NXT.ai is a comprehensive multi-tenant SaaS platform built for marketing automation, CRM, workflows, and AI-powered features. The application follows a modern full-stack architecture with React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with Tailwind CSS styling
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **API Design**: RESTful API endpoints with proper error handling
- **Development**: TSX for TypeScript execution in development

### Database Architecture
- **Database**: PostgreSQL with connection pooling
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Multi-tenancy**: Company-based tenant isolation

## Key Components

### Authentication System
- JWT token-based authentication
- Session management with secure cookies
- Role-based access control (admin, manager, user)
- Company-based multi-tenant isolation

### Multi-Tenant Architecture
- Company table serves as tenant boundary
- All data scoped to company ID
- User association with companies
- Tenant-specific branding and configuration

### Core Modules
1. **CRM & Leads Management**: Lead tracking, status management, source attribution
2. **Marketing Campaigns**: Campaign creation, management, and tracking
3. **Workflows**: Automated process management
4. **AI Chatbot**: Intelligent customer service automation
5. **Integrations**: Third-party service connections (Facebook, Google, etc.)
6. **Financial**: ASAAS payment integration
7. **Webhooks**: Event-driven integrations
8. **Landing Pages**: Page builder for lead capture
9. **Reports & Analytics**: Data insights and reporting
10. **Client Center**: Customer portal and account management

### UI/UX Components
- Modern design system with shadcn/ui components
- Responsive design for mobile and desktop
- Dark/light theme support
- Gradient backgrounds and hover effects
- Sidebar navigation with collapsible states

## Data Flow

### Request Flow
1. Client requests authenticated via JWT middleware
2. Company context established from user association
3. Data operations scoped to company tenant
4. Responses formatted consistently with error handling

### Database Schema
- **Companies**: Tenant boundary with branding configuration
- **Users**: User accounts with company association and roles
- **Leads**: Customer lead management with source tracking
- **Campaigns**: Marketing campaign configuration
- **Workflows**: Automation process definitions
- **Webhooks**: Event notification endpoints

### State Management
- Server state managed via TanStack Query
- Local state handled by React hooks
- Form state managed by React Hook Form
- Authentication state in React Context

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router alternative)
- UI components (Radix UI primitives)
- Styling (Tailwind CSS, class-variance-authority)
- Form handling (React Hook Form, Hookform resolvers)
- Data fetching (TanStack Query)
- Date utilities (date-fns)
- Icons (Lucide React)

### Backend Dependencies
- Express.js for server framework
- JWT for authentication
- bcryptjs for password hashing
- Drizzle ORM for database operations
- Neon Database serverless driver
- Development tooling (tsx, esbuild)

### Database
- PostgreSQL as primary database
- Drizzle migrations for schema management
- Connection pooling for scalability

## Deployment Strategy

### Development Environment
- Replit-hosted development with hot reload
- Vite dev server for frontend
- TSX for backend TypeScript execution
- PostgreSQL database provisioned via Replit

### Production Build
- Vite builds optimized frontend bundle
- esbuild compiles backend to single executable
- Static files served from Express
- Database migrations applied via Drizzle

### Environment Configuration
- Database connection via DATABASE_URL
- JWT secret for authentication
- Development/production mode switching
- Asset serving configuration

### Replit Configuration
- Node.js 20 runtime
- PostgreSQL 16 database
- Autoscale deployment target
- Parallel workflow execution

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup