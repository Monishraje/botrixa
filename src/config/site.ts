import { env } from "./env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "A production-ready SaaS application foundation.",
  url: env.NEXT_PUBLIC_APP_URL,
  links: {
    github: env.NEXT_PUBLIC_GITHUB_URL,
    support: env.NEXT_PUBLIC_SUPPORT_EMAIL,
  },
};

export type SiteConfig = typeof siteConfig;
