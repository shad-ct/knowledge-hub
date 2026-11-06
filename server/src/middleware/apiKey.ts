import { Request, Response, NextFunction } from 'express';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = process.env.API_WRITE_KEY;

  // If no API key is configured, allow all requests (open mode)
  if (!apiKey || apiKey === 'your-secret-api-key-here') {
    next();
    return;
  }

  // 1. Allow same-origin requests from the browser dashboard (human curator).
  // This satisfies the zero-login requirement for the web interface while preventing CSRF.
  const secFetchSite = req.headers['sec-fetch-site'];
  const host = req.headers.host;
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  const isSameOriginHeader = secFetchSite === 'same-origin';

  let isOriginMatch = false;
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      isOriginMatch = originHost === host;
    } catch {
      isOriginMatch = origin.replace(/^https?:\/\//, '') === host;
    }
  }

  let isRefererMatch = false;
  if (referer && host) {
    try {
      const refererHost = new URL(referer).host;
      isRefererMatch = refererHost === host;
    } catch {
      isRefererMatch = false;
    }
  }

  // Local development exemption
  const isLocalDev =
    process.env.NODE_ENV !== 'production' &&
    Boolean(
      origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))
    );

  if (isSameOriginHeader || isOriginMatch || isRefererMatch || isLocalDev) {
    next();
    return;
  }

  // 2. Programmatic calls (AI agents, external scripts, CLI) must supply the secret key
  const providedKey =
    req.headers['x-api-key'] ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '');

  if (!providedKey || providedKey !== apiKey) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing API key. Include X-API-Key header.',
    });
    return;
  }

  next();
};


