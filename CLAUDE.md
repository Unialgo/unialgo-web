# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start dev server**: `ng serve` or `npm start` (runs on http://localhost:4200)
- **Build**: `ng build` or `npm run build`
- **Build for development**: `ng build --watch --configuration development`
- **Run tests**: `ng test` or `npm test`
- **Generate component**: `ng generate component component-name`

## Architecture Overview

This is an Angular 19 application using PrimeNG UI components and Tailwind CSS for a university algorithm platform.

### Module Structure
- **ctx-auth**: Authentication module with login/signup
- **ctx-layout**: Layout components and services (loading, notifications)
- **ctx-dashboards**: Dashboard views for professors
- **ctx-university**: Core university features (questions, assignments, test cases)
- **libraries**: Shared abstracts, components, pipes, and utilities
- **api**: HTTP services organized by domain (auth, university, ai)

### Key Architectural Patterns

1. **Context-based modules** (`ctx-*`): Feature modules grouped by domain context
2. **Base abstracts**: All components extend `BaseAbstract` for consistent error handling, loading states, and notifications
3. **Reactive forms**: Components extend `ReactiveFormAbstract` for form management
4. **Entity lists**: List components extend `EntityListAbstract` for pagination and CRUD operations
5. **Modal pattern**: Modal components extend `ModalAbstract`

### Authentication Flow
- JWT-based auth with access/refresh tokens stored in localStorage
- Auth interceptor automatically adds tokens to requests
- Auto token refresh 60 seconds before expiration
- Auth guard protects routes requiring authentication

### API Structure
- Main API: `http://localhost:8080` (university services)
- Auth API: `http://localhost:8180` (authentication services)
- Services are organized by domain under `src/app/api/`

### Styling
- SCSS for component styles (default configuration)
- PrimeNG with Aura theme and dark mode support
- Tailwind CSS for utility classes
- Custom layout styles in `src/assets/layout/`

### Component Conventions
- Non-standalone components (configured in angular.json)
- SCSS styling by default
- Prefix: `app`
- All components should extend appropriate base abstracts for consistency