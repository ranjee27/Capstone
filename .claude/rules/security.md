# Security

## Secrets
- Never commit API keys, Supabase service role keys, or `.env` files —
  `.gitignore` already excludes `.env*`, don't override that
- Only `NEXT_PUBLIC_*` env vars are safe to expose to the client — never
  put a secret key behind that prefix
- Supabase anon/public key is fine client-side; service role key is
  server-only, used only in Route Handlers/Server Actions

## Auth
- Auth checks are enforced server-side (middleware, Route Handlers) —
  a client-side check alone is never sufficient to protect a route
- Session/auth tokens rely on Supabase Auth's cookie-based session, not
  manually managed localStorage tokens
- Admin-only routes are protected in `middleware.ts`, not just hidden
  from navigation UI

## Data handling
- Validate all form input server-side, even if also validated client-side
- Sanitize any user-generated content before rendering if it's ever
  rendered as HTML (avoid `dangerouslySetInnerHTML` unless unavoidable
  and sanitized)
- Use Supabase Row Level Security (RLS) policies on every table holding
  user data — don't rely solely on application-layer checks

## Third-party calls
- Any external API call requiring a secret key happens server-side only
