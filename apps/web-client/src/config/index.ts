// Environment configuration for the application
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5005',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
    endpoints: {
      products: process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT || '/products',
      themes: process.env.NEXT_PUBLIC_THEMES_ENDPOINT || '/themes',
      categories: process.env.NEXT_PUBLIC_CATEGORIES_ENDPOINT || '/categories',
      tiers: process.env.NEXT_PUBLIC_TIERS_ENDPOINT || '/tiers',
      authors: process.env.NEXT_PUBLIC_AUTHORS_ENDPOINT || '/authors',
    },
  },

  // Application Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'TierTrade',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // Pagination Configuration
  pagination: {
    defaultPageSize: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '10', 10),
    maxPageSize: parseInt(process.env.NEXT_PUBLIC_MAX_PAGE_SIZE || '100', 10),  },

  // Development Configuration
  development: {
    debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  },

  // Validation
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// Type for the config object
export type Config = typeof config;

// Export individual sections for convenience
export const { api, app, pagination, development } = config;
