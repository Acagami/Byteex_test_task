# Byteex API

The NestJS API exposes the Strapi homepage through `GET /api/homepage` and keeps CMS credentials out of the React app.

## Local configuration

1. Copy `.env.example` to `.env`.
2. Set `STRAPI_API_TOKEN` to a read-only API token from Strapi, or configure the public role to read the Homepage content type.
3. Start Strapi on port 1337, then run `npm run start:dev` from this directory.

The React app can request `http://localhost:3000/api/homepage`. `FRONTEND_ORIGIN` controls the allowed browser origin.
