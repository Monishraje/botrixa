# SaaS Application Foundation

Welcome to the open-source production-ready SaaS application foundation. This repository serves as a highly scalable, robust starting point for modern web applications.

## 🌟 Project Vision

Our vision is to provide a clean, modular, and developer-friendly foundation that scales from a weekend prototype to an enterprise-grade SaaS application without requiring complete rewrites.

## ✨ Features

- **Strictly Typed**: End-to-end TypeScript with strict compiler options.
- **Developer Experience**: Automated pre-commit hooks, code formatting, and conventional commit enforcement.
- **Design System**: Accessible, unstyled UI components via `shadcn/ui` with a minimal, Vercel-inspired dark theme.
- **Database Ready**: Prisma ORM configured for PostgreSQL, easily deployable to edge environments like Neon.
- **Feature-Based Architecture**: Highly decoupled codebase ensuring long-term maintainability.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/) & [t3-env](https://env.t3.gg/)

## 🧠 Project Philosophy

We believe in explicit over implicit, strong conventions over configuration, and modularity over centralization. By adopting a feature-based architecture, we ensure that as the application grows, the cognitive load on developers remains low.

## 📁 Project Structure

The repository is structured to separate concerns strictly:

- `src/app`: Next.js Routing Logic (Pages, Layouts).
- `src/features`: Domain-specific modules containing their own components, hooks, and logic.
- `src/components`: Global shared components (`ui`, `layout`, `common`).
- `src/lib`, `src/utils`, `src/types`, `src/config`: Core global utilities.
- `docs/`: Extensive architectural decisions and roadmaps.

## 🏗️ Architecture Overview

For an in-depth look at data flow, component design, and our architectural decisions, please refer to our [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [DECISIONS.md](docs/DECISIONS.md).

## 📝 Coding Standards

- **No `any` types**: We strictly enforce `unknown` or specific generics over `any`.
- **Absolute Imports**: Always use the `@/` path alias.
- **Barrel Exports**: Use `index.ts` files to simplify imports from core directories.

## 🌿 Branch Strategy

We follow a simplified Git Flow:

- `main`: The production-ready branch.
- `feature/*`: For all new features (e.g., `feature/user-auth`).
- `fix/*`: For bug fixes (e.g., `fix/header-layout`).
- `chore/*`: For maintenance tasks (e.g., `chore/update-deps`).

## 💬 Conventional Commits

We strictly enforce Conventional Commits via Husky and Commitlint. Your commit messages must follow the format: `<type>: <subject>`.
Supported types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## ❓ FAQ

**Why Prisma over Drizzle?**
Prisma provides unmatched developer experience with its schema file and auto-generated types, which is ideal for a foundation prioritizing speed and safety.

**Why no business logic in `src/app`?**
Keeping `src/app` strictly for routing makes it trivial to migrate routes or build alternative clients without untangling UI from domain logic.

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Copy `.env.example` to `.env.local` and populate the fields.
4. **Initialize Database**:
   ```bash
   npm run db:push
   ```
5. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 📜 Development Scripts

- `npm run dev` - Start local server
- `npm run check` - Runs linter, typecheck, and build verification
- `npm run clean` - Safely removes build artifacts cross-platform
- `npm run db:studio` - Opens the visual database editor

## 🔐 Environment Variables

All environment variables are validated at build-time. Check `src/config/env.ts` for the required schema. Ensure `DATABASE_URL` is set to a valid PostgreSQL connection string.

## 🗺️ Roadmap

See [ROADMAP.md](docs/ROADMAP.md) for upcoming milestones, including our upcoming Landing Page and Authentication integration in Sprint 2.

## 🤝 Contributing

Please see our [CONTRIBUTING.md](docs/CONTRIBUTING.md) for full guidelines on submitting Pull Requests.

## 📄 License

MIT License
