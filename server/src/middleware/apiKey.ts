import { Request, Response, NextFunction } from 'express';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = process.env.API_WRITE_KEY;

  // If no API key is configured, allow all requests (open mode)
  if (!apiKey || apiKey === 'your-secret-api-key-here') {
    next();
    return;
  }

  const providedKey =
    req.headers['x-api-key'] ||
    req.headers['authorization']?.replace('Bearer ', '');

  if (!providedKey || providedKey !== apiKey) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing API key. Include X-API-Key header.',
    });
    return;
  }

  next();
};

