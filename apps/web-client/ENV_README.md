# Environment Configuration

This document explains how to configure environment variables for the TierTrade web client.

## Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the variables in `.env.local` to match your environment.

## Environment Files

- `.env.example` - Example configuration with all available variables
- `.env.local` - Local development configuration (not tracked by git)
- `.env.production` - Production configuration (if needed)

## Environment Variables

### API Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API server | `http://localhost:5005` |
| `NEXT_PUBLIC_API_TIMEOUT` | Request timeout in milliseconds | `10000` |

### Application Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name | `TierTrade` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |
| `NODE_ENV` | Environment mode | `development` |

### Pagination

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DEFAULT_PAGE_SIZE` | Default number of items per page | `10` |
| `NEXT_PUBLIC_MAX_PAGE_SIZE` | Maximum number of items per page | `100` |

### Development

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DEBUG_MODE` | Enable debug logging | `true` |
| `NEXT_PUBLIC_LOG_LEVEL` | Logging level | `debug` |

## Usage in Code

Import the configuration object:

```typescript
import { config } from '../config';

// Use configuration values
const apiUrl = config.api.baseUrl;
const enableFeature = config.features.enableFavorites;
```

Or import specific sections:

```typescript
import { api, features } from '../config';

const baseUrl = api.baseUrl;
const favoritesEnabled = features.enableFavorites;
```

## Best Practices

1. **Never commit sensitive data** - Use `.env.local` for secrets
2. **Use `NEXT_PUBLIC_` prefix** - Required for client-side access in Next.js
3. **Provide defaults** - Always have fallback values in the config
4. **Document new variables** - Update this README when adding new variables
5. **Use feature flags** - Enable/disable features without code changes

## Next.js Environment Variable Rules

- Variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Other variables are only available server-side
- Environment files are loaded in this order:
  1. `.env.local` (always ignored by git)
  2. `.env.production` or `.env.development`
  3. `.env`

## Example Usage

```typescript
// In a component or service
import { api, features } from '../config';

if (features.enableSearch) {
  // Render search component
}

// Make API call
fetch(`${api.baseUrl}${api.endpoints.products}`)
```
