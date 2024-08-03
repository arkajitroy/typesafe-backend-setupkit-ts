import rateLimit from 'express-rate-limit';

export const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too Many Requests',
    message: 'You have exceeded the 100 requests in 15 mins limit!',
  },
  headers: true, // include rate limit info in the `RateLimit-*` headers
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: 'Too Many Requests',
      message: 'You have exceeded the 100 requests in 15 mins limit!',
    });
  },
});
