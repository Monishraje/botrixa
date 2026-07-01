# Architecture Decisions Record (ADR)

## Next.js (App Router)

Next.js 15 provides robust Server Components and Server Actions. It eliminates the need for a separate backend for standard SaaS applications, greatly accelerating development while providing excellent SEO and performance out-of-the-box.

## Prisma & PostgreSQL (Neon)

- **PostgreSQL**: Industry standard, robust, relational database.
- **Prisma**: Type-safe ORM that makes schema management and querying intuitive. It integrates perfectly with TypeScript, preventing a massive class of runtime errors.
- **Neon Compatibility**: Serverless edge-friendly connection pooling.

## Tailwind CSS & shadcn/ui

- **Tailwind**: Utility-first CSS allows for rapid styling without leaving the component file, ensuring styles are scoped and easily deleted when a component is deleted.
- **shadcn/ui**: Not a traditional component library, but a collection of accessible, copy-paste components. This gives us complete ownership over the code and styling, preventing vendor lock-in while providing highly accessible primitives.

## Feature-based Architecture

Standard layered architectures (grouping by type, like all controllers together) scale poorly as an application grows, resulting in massive folders. Grouping by feature keeps domain logic co-located, making it easier to work on a specific part of the app without context switching across the whole codebase. It also paves the way for micro-frontends if ever required.
