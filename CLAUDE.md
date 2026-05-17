@AGENTS.md

# Sessionly Client — Frontend Engineering Guide

Stack: **Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · Base UI · TanStack Query · NextAuth**

---

## 1. Package Management

- **pnpm only.** Never use npm or yarn. The `preinstall` script enforces this.
- Never commit `package-lock.json` or `yarn.lock`. CI will fail.
- Pin major versions. Prefer `^` ranges only for patch-safe packages.

---

## 2. Project Structure

```
src/
  app/                  # Next.js App Router — route files and layouts only
  api/
    <entity>/           # One folder per domain entity (auth, session, chat…)
      config.ts         # Endpoints, query keys, mutation keys
      types.ts          # Request/response TypeScript types
      endpoints.ts      # ky HTTP calls (no hooks, no React)
      hooks/            # TanStack Query hooks (useGet*, useCreate*, …)
  modules/
    <ModuleName>/       # Self-contained feature module
      components/       # Components used only inside this module
      pages/            # Page-level components rendered by app/ routes
      hooks/            # Module-scoped React hooks
      schemas/          # Module-scoped Zod schemas
      utils/            # Module-scoped pure utilities
  components/
    ui/                 # Dumb primitives (Button, Input, Card…)
    stories/            # Storybook stories
  lib/
    httpClient/         # Configured ky instance (authorized / unauthorized)
    react-query/        # QueryClient + ReactQueryProvider
  hooks/                # Shared hooks (used by 2+ modules)
  types/                # Shared TypeScript types (used by 2+ modules)
  utils/                # Shared pure utilities (used by 2+ modules)
```

Rules:
- `app/` contains only page files and layouts — zero business logic.
- `api/` hooks are the only place that calls endpoints. Components never call `ky` directly.
- Module components consume `src/api/` hooks.
- If a component, hook, or util is used by **2+ modules**, move it to top-level folders.
- `ui/` components are dumb — no business logic, no data fetching.
- Never import from `app/` inside `modules/` or `api/`.

---

## 3. Component Conventions

Each component gets its own folder:

```
components/
  MyComponent/
    MyComponent.tsx   # Implementation
    index.ts          # Re-export
```

- **PascalCase** for component files and exports.
- **camelCase** for hooks, utils, and non-component files.
- Always define a named `Props` type — no inline anonymous objects.
- Extend native HTML props where applicable (`React.ComponentProps<'button'>`).
- Use `forwardRef` for native element wrappers. Set `displayName`.

---

## 4. Styling with Tailwind CSS 4

- No inline `style` props unless values can't be expressed as Tailwind classes.
- Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) to merge classes.
- Use **CVA** for components with multiple variants. Always include `defaultVariants`.
- Never hardcode colors — use design tokens (CSS variables) from `globals.css`.
- Dark mode uses the `class` strategy. Never hardcode dark colors outside token definitions.

---

## 5. Forms — React Hook Form + Zod

- Every input registered with `react-hook-form`. No uncontrolled inputs.
- Schema lives in `src/modules/<Module>/schemas/<domain>.schema.ts`.
- Use `@hookform/resolvers/zod`. Never validate manually in `onSubmit`.
- Reuse `FormField` wrapper for consistent label/error/input layout.
- Error messages from Zod — never hardcode strings in field components.
- Infer types: `type FormData = z.infer<typeof mySchema>`.

---

## 6. Data Fetching — TanStack Query

All data fetching and mutations go through TanStack Query. No `useEffect + fetch`. No Server Actions.

### HTTP Client (`src/lib/httpClient/index.ts`)

```ts
export const httpClient = {
  authorized: () => kyBase.extend({
    hooks: { beforeRequest: [addBearerToken] }, // injects session access_token
  }),
  unauthorized: () => kyBase.extend({ hooks: { beforeRequest: [] } }),
}
```

### API Module structure (`src/api/<entity>/`)

- **`config.ts`** — `defineRoute`, `defineQueryKey`, `defineMutationKey`
- **`types.ts`** — all TypeScript types for the entity
- **`endpoints.ts`** — functions calling `httpClient.authorized().get/post/put/delete`
- **`hooks/`** — one file per operation: `useGet<Entity>.tsx`, `useCreate<Entity>.tsx`, etc.

### Patterns

```ts
// Query
export const useGetSessions = defineQuery<GetSessionsResponse, Params>(
  ({ options, params }) => useQuery({
    ...options,
    queryKey: [SESSION_QUERY_KEYS.getSessions(), params],
    queryFn: () => getSessions(params),
  })
)

// Mutation
export const useCreateSession = defineMutation<CreateSessionResponse, CreateSessionBody>(
  ({ options }) => {
    const queryClient = useQueryClient()
    return useMutation({
      ...options,
      mutationFn: (body) => createSession(body),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.getSessions({ exact: false }) }),
    })
  }
)
```

- `QueryClient` lives in `src/lib/react-query/index.ts`. Default `staleTime`: 5 minutes.
- Global mutation errors toast via `defaultOptions.mutations.onError`.
- Always invalidate or optimistically update cache after mutations.

---

## 7. Authentication — NextAuth

- Config in `src/auth.config.ts`, init in `src/auth.ts`, type augmentation in `src/auth.d.ts`.
- Protected routes via `src/middleware.ts` using the NextAuth `authorized` callback.
- JWT strategy. Access token forwarded from credentials provider response → stored in JWT → injected by `httpClient.authorized()`.
- **Login**: call `signIn('credentials', { email, password })` from `next-auth/react`.
- **Register**: TanStack mutation → `postRegister` endpoint → on success, auto-call `signIn`.
- Read session on client with `useSession()`. Never pass raw tokens as props.

---

## 8. TypeScript

- **No `any`.** Use `unknown` for unknown shapes and narrow explicitly.
- No `@ts-ignore`. Use `@ts-expect-error` with an explanation if necessary.
- Strict mode is on. Never weaken it.
- Prefer `type` over `interface`. `interface` only for declaration merging.
- Export types from `src/types/` when shared across 2+ features.

---

## 9. Accessibility

All UI components must meet WCAG 2.1 AA.

- Every interactive element needs a keyboard-accessible focus state.
- Semantic HTML first — ARIA only when semantics are insufficient.
- Images: meaningful `alt`. Decorative: `alt=""`.
- Form inputs always associated with a `<label>`.
- Modal dialogs trap focus — `Dialog` from Base UI handles this.

---

## 10. Storybook

Stories required only for **shared UI primitives** used across 2+ features.
Each story: Default + all variants + Interactive with `argTypes`.
Stories in `src/components/stories/`. Port `6006` (`pnpm storybook`).

---

## 11. Testing — E2E First

**Playwright E2E tests** are the priority. Unit tests only for complex branching logic.

- Tests in `e2e/`, named `<feature>.spec.ts`.
- Cover: auth flows, full form flows, role-based UI, error states.
- Skip: component unit tests (Storybook covers visual), snapshot tests.

```ts
test('user can log in', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('user@example.com')
  await page.getByLabel('Password').fill('secret')
  await page.getByRole('button', { name: /sign in/i }).click()
  await expect(page).toHaveURL('/dashboard')
})
```

---

## 12. Code Quality

- No prop drilling more than 2 levels. Use composition or context.
- No business logic in UI components. Extract to hooks.
- No magic strings. Use const maps or enums.
- No `useEffect` for event handling or derived state.
- No default exports except Next.js pages and layouts.
- **Import order**: Node built-ins → external packages → `@/` paths → relative → type imports.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). One logical change per commit.

---

## 13. What NOT to do

| Forbidden | Reason |
|---|---|
| `npm install` / `yarn add` | pnpm-only |
| `any` in TypeScript | Defeats type safety |
| Hardcoded colors | Breaks theming |
| `useEffect + fetch` for data | Use TanStack Query |
| Server Actions | Use TanStack mutations + API modules |
| Raw `ky`/`fetch` in components | Go through `src/api/` hooks |
| `console.log` in code | Use error boundaries / logging |
| `export default` for non-page files | Use named exports |

---

## 14. Running the Project

```bash
pnpm dev                        # Next.js dev server (localhost:3000)
pnpm storybook                  # Storybook (localhost:6006)
pnpm exec playwright test       # E2E tests
pnpm exec playwright test --ui  # Playwright UI
pnpm lint                       # ESLint
pnpm format                     # Prettier
pnpm build                      # Production build
```

---

## 15. Language

All code in **English** — names, comments, error messages, Zod messages, commits. No exceptions.

---

## 16. Docs

- `docs/entities.docs.md` — domain model (User, Session, Chat, Payment, Review)
- `docs/code/backend-integrations.md` — TanStack Query + API module patterns (canonical reference)
- `docs/code/authentication.md` — NextAuth setup guide

Read entity docs before building any feature that touches data.

---

## 17. Animations

Animation is a **core differentiator** of Sessionly — the UI must feel fluid, modern, and alive.

- **Library**: `motion` (`motion/react`) — the official successor to Framer Motion. Never use CSS-only animations for interactive UI elements.
- **Every** page transition, form step change, card interaction, and mount/unmount must be animated.
- Use `AnimatePresence` for any element that conditionally mounts or unmounts.
- **Preferred easing**: `[0.22, 1, 0.36, 1]` (expo out) for entrances/exits. Spring (`type: "spring"`) for hover and tap interactions.
- Stagger form fields **80ms** apart on mount. Cap UI feedback animations at **500ms**.
- Import from `motion/react`, not `framer-motion`.
- Default dark theme: `dark` class on `<html>` in `src/app/layout.tsx`.
