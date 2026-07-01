# Contributing Guidelines

Thank you for contributing! Please adhere to the following standards to ensure a healthy and consistent codebase.

## Development Workflow

1. Create a new branch for your feature or bugfix (`feature/feature-name` or `fix/bug-description`).
2. Write clean, self-documenting code following the `ARCHITECTURE.md` conventions.
3. Use the provided centralized logger (`src/lib/logger.ts`) instead of `console.log`.
4. Ensure your code passes all type checks and linting rules by running `npm run build` and `npm run lint`.
5. Open a Pull Request using the provided PR template.

## Git Standards

- Write clear, concise commit messages.
- Use conventional commits (e.g., `feat: add user profile`, `fix: resolve hydration error`, `chore: update dependencies`).
- Do not commit secrets or environment variables.

## Coding Standards

- **TypeScript Strict Mode**: No `any` types unless absolutely necessary.
- **No inline styles**: Use Tailwind CSS utility classes.
- **Components**: Keep components small and focused. Break them down if they become too large.
- **Business Logic**: Keep business logic in `services` or `actions`, never directly inside UI components or the `app/` router files.
