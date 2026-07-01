# Architecture

This document describes the high-level architecture and conventions of the SaaS application.

## Folder Structure

Our foundation uses a strict feature-based architecture to avoid massive central folders and to keep related code co-located.

- `src/app`: Contains strictly Next.js routing logic (Pages, Layouts, Route Handlers). No business logic should reside here.
- `src/features`: Contains isolated modules for specific domains.
- `src/components`: Global shared components categorized into `ui` (shadcn/ui), `layout`, and `common`.
- `src/config`: Centralized configuration logic.
- `src/lib`: Wrapping third-party libraries and configuring them (e.g., `logger.ts`).
- `src/types`: Global types and interfaces (e.g., API interfaces, Custom Error classes).
- `src/utils`: Pure utility functions that have no dependencies on state or UI.
- `prisma`: Database schema and migrations.

## Feature Conventions

Every future feature (e.g., `billing`, `user-profile`) must reside in `src/features/<feature-name>/`.
A feature should contain its own specific logic following this convention:

```text
feature-name/
├── components/   # Feature-specific UI
├── hooks/        # Feature-specific React hooks
├── services/     # Feature-specific data fetching or mutations
├── types/        # Feature-specific TypeScript interfaces
├── utils/        # Feature-specific utility functions
└── actions/      # Feature-specific Server Actions
```

Features should expose their public API through an `index.ts` barrel file at their root to encapsulate internal structure from the rest of the application.

## Data Flow

- **Client to Server**: Prefer Next.js Server Actions (`src/actions` or inside features) for mutations. For complex data fetching, use React Server Components where possible, and standard API calls via `src/services` for client components.
- **Server to Database**: Use Prisma ORM.

## Config System

Configurations are validated using `zod` and `@t3-oss/env-nextjs` in `src/config/env.ts` to ensure type-safe environment variables at build-time.

## Naming Conventions

- **Files/Folders**: `kebab-case` (e.g., `theme-provider.tsx`, `api-client.ts`).
- **Components**: `PascalCase` (e.g., `Button`, `UserProfile`).
- **Hooks**: `camelCase` starting with `use` (e.g., `useMobile`).
- **Types/Interfaces**: `PascalCase` (e.g., `ApiResponse`, `ValidationError`).

## Import Conventions

- Use path aliases (e.g., `@/components/ui/button`) over relative paths.
- Use barrel exports (`index.ts`) to simplify imports when importing from directories like `@/types`, `@/utils`, `@/hooks`, and `@/services`.
