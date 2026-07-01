export const APP_CONSTANTS = {
  theme: {
    defaultTheme: "dark",
    storageKey: "app-theme",
  },
  api: {
    timeout: 10000,
    retryAttempts: 3,
  },
  pagination: {
    defaultPageSize: 20,
  },
} as const;
