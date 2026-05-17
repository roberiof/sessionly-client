Follow the step-by-step guide to set up authentication using `next-auth` based on the provided files.

### Authentication Configuration with NextAuth

#### Step 1: Configure `auth.ts`

In the `auth.ts` file, you already have the basic configuration to initialize NextAuth. If you need to add any middleware or modify something, this is the place.

```typescript
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
```

#### Step 2: Configure `auth.config.ts`

In the `auth.config.ts` file, configure the callbacks and providers. This file controls the authentication routes, sessions, and callback functions for JWT and session.

```typescript
import type { NextAuthConfig } from "next-auth";
import { providers } from "./api/auth/providers";
import { AUTH_SECRET } from "./config";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.access_token_expires = user.access_token_expires;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.access_token = token.access_token as string;
        session.user.access_token_expires = token.access_token_expires as number;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        return !!isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers,
  debug: true,
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
```

#### Step 3: Configure `auth.d.ts`

In the `auth.d.ts` file, you extend the NextAuth type definitions to include additional fields in the `User` object.

```typescript
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    access_token: string;
    access_token_expires: number;
    role: "admin" | "user";
  }
}
```

#### Step 4: Configure Credentials

In the credentials file, configure the authentication provider with the necessary validations using `zod`.

```typescript
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { postLogin } from "..";

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
});

export type CredentialsBodyType = z.infer<typeof signInSchema>;

export const credentials = Credentials({
  async authorize(credentials) {
    const credentialsValidation = signInSchema.safeParse(credentials);

    if (credentialsValidation.success) {
      const { email, password } = credentialsValidation.data;

      const response = await postLogin({ email, password });

      return {
        role: "admin",
        access_token: response.access_token,
        access_token_expires: response.access_token_expires,
      };
    }

    return null;
  },
});
```

### Step 5: Social Providers

In `@/api/auth/providers` create a new file to add a social provider. After configuring the file, add it to the providers array located in the `index.ts` file of the same folder. Example with Google:

```typescript
import Google from "next-auth/providers/google";

import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from "@/config";

export const google = Google({
  clientId: AUTH_GOOGLE_ID,
  clientSecret: AUTH_GOOGLE_SECRET,
  // Google requires "offline" access_type to provide a `refresh_token`
  authorization: { params: { access_type: "offline", prompt: "consent" } },
});
```

### Final Considerations

To customize the authentication configuration for your specific context, follow these steps:

1. **Provider Configuration:** Add or modify authentication providers as needed in the `auth.config.ts` file.
2. **Extend User Typing:** Add or modify the properties that should return within the user according to your context in the `auth.d.ts` file.
3. **Custom Pages:** If necessary, change the login page or other endpoints.
4. **Custom Callbacks:** Modify the JWT and session callbacks to include relevant user information.
