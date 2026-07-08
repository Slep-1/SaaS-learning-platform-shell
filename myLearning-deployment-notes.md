# myLearning — Local vs. Production Environment Notes

## The general pattern: environment variables per environment

Never hardcode `http://localhost:3000` (or any environment-specific URL) directly in code. Use an environment variable instead — e.g. `NEXT_PUBLIC_APP_URL` — and let its value differ per environment:

- **Local development** (`.env` / `.env.local`): `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- **Production**: `NEXT_PUBLIC_APP_URL=https://mylearning.app` (or whatever the real domain ends up being)

If hosting on **Vercel**: its dashboard lets you set environment variables scoped separately per Production / Preview / Development. Set the real domain once for Production, and Vercel injects the correct value automatically depending on which deployment is running — no code changes needed to switch.

## Clerk specifically: Development vs. Production are separate instances

Not just different keys — genuinely separate instances with different behavior:

| | Development instance (current) | Production instance |
|---|---|---|
| Keys | `pk_test_...` / `sk_test_...` | `pk_live_...` / `sk_live_...` |
| Email sending | From Clerk's generic `@accounts.dev` domain | From your own verified domain |
| Setup required | None — works out of the box | Verify domain ownership, add DNS records (SPF/DKIM, similar to email deliverability setup) |
| Limits | Monthly email quota, dev-only restrictions | No dev-only limits |

**Action item, not urgent yet:** creating the Production instance (domain verification, DNS records, swapping keys) is a real setup step to do when actually preparing to launch to a real client — not something to do while still building features locally. Worth a dry run before a client is waiting on it, so it isn't a surprise under time pressure.

## Related fix already in place

The organization invite redirect issue (invites stranding users on Clerk's hosted `accounts.dev` portal instead of the app) was fixed by having Claude Code use an env-var-driven `redirectUrl` instead of a hardcoded localhost string — this means it's already following the correct pattern above, and will automatically point at the right domain once `NEXT_PUBLIC_APP_URL` (or equivalent) is set for production.
