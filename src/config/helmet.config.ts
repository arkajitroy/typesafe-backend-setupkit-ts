import { RequestHandler } from 'express';
import helmet from 'helmet';

const helmetConfig: RequestHandler[] = [
  helmet(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://trustedscripts.example.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  }),
  helmet.referrerPolicy({ policy: 'no-referrer' }),
  helmet.frameguard({ action: 'deny' }),
  helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }),
  helmet.hidePoweredBy(),
];

export default helmetConfig;
