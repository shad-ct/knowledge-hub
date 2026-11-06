import { Request, Response, NextFunction } from 'express';

/**
 * API Key Middleware
 *
 * Open Write Access by Default:
 * Writes are publicly accessible without authentication unless process.env.REQUIRE_API_KEY === "true".
 *
 * When REQUIRE_API_KEY === "true", the key can be supplied via:
 * 1. HTTP Header: 'X-API-Key' or 'Authorization: Bearer <key>'
 * 2. Query Parameter: ?apiKey=<key> or ?api_key=<key>
 * 3. JSON Request Body: { "apiKey": "<key>", ... } or { "api_key": "<key>", ... }
 */
export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // If API key is not strictly required, allow all write operations by default
  const requireApiKey = process.env.REQUIRE_API_KEY === 'true';
  if (!requireApiKey) {
    next();
    return;
  }

  const expectedKey = process.env.API_WRITE_KEY || process.env.API_KEY;

  // If REQUIRE_API_KEY is true but no expected key configured, allow
  if (!expectedKey || expectedKey === 'your-secret-api-key-here') {
    next();
    return;
  }

  // Same-origin browser dashboard exemption
  const secFetchSite = req.headers['sec-fetch-site'];
  const host = req.headers.host;
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (
    secFetchSite === 'same-origin' ||
    (origin && host && origin.replace(/^https?:\/\//, '') === host) ||
    (referer && host && referer.includes(host)) ||
    (process.env.NODE_ENV !== 'production' && origin && (origin.includes('localhost') || origin.includes('127.0.0.1')))
  ) {
    next();
    return;
  }

  // Check 3 locations for the API key:
  // 1. HTTP Header (X-API-Key or Authorization Bearer)
  const headerKey =
    (req.headers['x-api-key'] as string) ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '');

  // 2. Query Parameter (?apiKey=... or ?api_key=...)
  const queryKey = (req.query?.apiKey || req.query?.api_key) as string | undefined;

  // 3. JSON Request Body ({ apiKey: "...", ... })
  const bodyKey = (req.body?.apiKey || req.body?.api_key) as string | undefined;

  const providedKey = headerKey || queryKey || bodyKey;

  if (!providedKey || providedKey !== expectedKey) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing API key. Provide via X-API-Key header, ?apiKey= query parameter, or JSON body apiKey field.',
    });
    return;
  }

  next();
};
