# SSL Certificate Error Module

## Overview
This module provides an SSL certificate error view that can be activated via an environment variable. When enabled, users attempting to access any protected route will be redirected to a styled SSL certificate error page.

## Files Created
- `src/app/ssl-error/ssl-error.component.ts` - Main component logic
- `src/app/ssl-error/ssl-error.component.html` - Error page template
- `src/app/ssl-error/ssl-error.component.css` - Styling for error page
- `src/app/ssl-error/ssl-error.component.spec.ts` - Component tests
- `src/app/_services/ssl-error.guard.ts` - Route guard to check environment flag
- `src/app/_services/ssl-error.guard.spec.ts` - Guard tests
- `src/environments/environment.prod.ts` - Production environment file

## Configuration

### Enable SSL Error View
To enable the SSL certificate error view, set the environment variable in the appropriate environment file:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
    production: false,
    defaultApiUrl: 'http://localhost:8000',
    defaultSDKKey: '7aec20a0-d867-42fa-8979-609f80937411',
    showSslCertificateError: true // Set to true to display SSL error
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
    production: true,
    defaultApiUrl: 'https://api.example.com',
    defaultSDKKey: '7aec20a0-d867-42fa-8979-609f80937411',
    showSslCertificateError: true // Set to true to display SSL error
};
```

## How It Works

1. **Route Guard**: The `SslErrorGuard` is applied to all main routes (home, distribution)
2. **Environment Check**: When a user tries to access a protected route, the guard checks `environment.showSslCertificateError`
3. **Redirect**: If true, the user is redirected to `/ssl-error`
4. **Error Page**: Displays a browser-style SSL certificate error page with options to go back or reload

## Features

### SSL Error Page
- Professional browser-style SSL certificate error design
- Error code display: `NET::ERR_CERT_AUTHORITY_INVALID`
- Action buttons:
  - **Go Back**: Returns to previous page
  - **Reload**: Reloads the current page
- Advanced section with certificate details:
  - Subject information
  - Issuer information
  - Current date/time
  - Warning message

### Styling
- Responsive design (mobile-friendly)
- Gradient background
- Smooth animations and transitions
- Expandable advanced information section

## Routes Modified
The following routes now have the SSL error guard applied:
- `/` (home with VerifyGuard and SslErrorGuard)
- `/home` (with SslErrorGuard)
- `/distribution` (with SslErrorGuard)

The `/ssl-error` route itself is not protected by the guard to prevent infinite redirects.

## Testing

Run unit tests with:
```bash
ng test
```

The module includes comprehensive test coverage for:
- Component functionality
- Guard behavior with different environment configurations
- User interactions (reload, go back)

## Usage Example

### Enable SSL Error Mode
1. Edit `src/environments/environment.ts`
2. Set `showSslCertificateError: true`
3. Run `ng serve`
4. Navigate to any route - you'll be redirected to the SSL error page

### Disable SSL Error Mode
1. Edit `src/environments/environment.ts`
2. Set `showSslCertificateError: false`
3. Run `ng serve`
4. Application works normally

## Integration Notes
- **Non-Breaking**: The existing application functionality remains unchanged when the flag is `false`
- **Standalone Component**: Uses Angular's standalone component API
- **Guard Chain**: Can be combined with other guards (like `VerifyGuard`)
- **No External Dependencies**: Uses only Angular core and common modules

## Future Enhancements
Potential improvements:
- Add certificate details from actual SSL errors
- Include certificate fingerprint display
- Add "Proceed Anyway" option (unsafe)
- Customize error messages per environment
- Log SSL error events to analytics
