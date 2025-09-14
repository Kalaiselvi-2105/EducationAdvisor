# Overview

CareerGuide is a comprehensive career guidance platform designed specifically for Indian students. The application helps students discover their strengths through aptitude assessments, explore government colleges, find scholarships, and map career paths from courses to professional opportunities. Built as a full-stack web application, it combines modern React frontend technologies with Express.js backend and PostgreSQL database to deliver personalized educational guidance.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built using React with TypeScript, utilizing a modern component-based architecture. The application uses Wouter for client-side routing, providing a lightweight alternative to React Router. State management is handled through TanStack Query (React Query) for server state and React's built-in state management for local component state.

The UI is built with shadcn/ui components, which provide a consistent design system based on Radix UI primitives and styled with Tailwind CSS. The design system follows the "new-york" style variant with CSS variables for theming, supporting both light and dark modes.

Key frontend decisions:
- **Wouter over React Router**: Chosen for its minimal bundle size and simple API
- **TanStack Query**: Provides robust caching, background updates, and error handling for API calls
- **shadcn/ui components**: Offers accessible, customizable components without vendor lock-in
- **Tailwind CSS**: Utility-first styling with custom CSS variables for theme consistency

## Backend Architecture
The server follows a clean REST API architecture built with Express.js and TypeScript. The application uses a layered approach with clear separation between routes, business logic, and data access.

The storage layer is abstracted through an interface-based approach, currently implemented as in-memory storage but designed to easily swap to database implementations. API routes are organized by domain (questions, assessments, colleges, scholarships) with consistent error handling and logging middleware.

Key backend decisions:
- **Express.js**: Provides lightweight, flexible web framework with excellent middleware ecosystem
- **Interface-based storage**: Allows easy switching between storage implementations (in-memory to database)
- **Middleware-driven architecture**: Centralized logging, error handling, and request processing
- **TypeScript throughout**: Ensures type safety across the entire application stack

## Database Design
The application uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema is designed around five core entities: users, assessments, questions, colleges, and scholarships. Each entity uses UUID primary keys and includes proper relationships and constraints.

The database schema supports:
- User management with secure authentication
- Flexible assessment system with JSON storage for responses and scores
- Comprehensive college data including courses, cutoffs, and fees
- Detailed scholarship information with eligibility criteria
- Study materials and career path mapping

Key database decisions:
- **Drizzle ORM**: Provides excellent TypeScript integration and SQL-like query building
- **JSON fields**: Used for flexible data structures (courses, eligibility criteria, responses)
- **UUID primary keys**: Ensures unique identifiers across distributed systems
- **Proper indexing**: Optimized for common query patterns

## Development and Build System
The project uses Vite for fast development and optimized production builds. The build system is configured for a monorepo structure with shared types and utilities between client and server code.

TypeScript configuration includes strict type checking with path aliases for clean imports. The development environment includes hot module replacement, error overlays, and Replit-specific integrations for seamless cloud development.

Key tooling decisions:
- **Vite**: Fast development server with optimized production builds
- **Monorepo structure**: Shared types and utilities between frontend and backend
- **Path aliases**: Clean import statements and better code organization
- **ESM modules**: Modern JavaScript module system throughout the application

# External Dependencies

## Database and ORM
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL for scalability and reliability
- **Drizzle ORM**: Type-safe ORM with excellent TypeScript integration and migration support
- **Drizzle Kit**: Database migration and schema management tools

## Frontend Libraries
- **React**: Core UI library with TypeScript support
- **Wouter**: Lightweight client-side routing solution
- **TanStack Query**: Powerful data synchronization and caching for React
- **Radix UI**: Unstyled, accessible UI primitives for building design systems
- **shadcn/ui**: Pre-built component library based on Radix UI primitives

## Styling and Design
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Consistent icon library with extensive coverage
- **CSS Variables**: Dynamic theming system for light/dark mode support

## Development Tools
- **Vite**: Fast build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Authentication and Session Management
- **express-session**: Session management middleware for Express
- **connect-pg-simple**: PostgreSQL session store for persistent sessions

## Validation and Forms
- **Zod**: Runtime type validation and schema parsing
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

The application is designed to be easily deployable on cloud platforms with environment-based configuration for database connections and other external services.