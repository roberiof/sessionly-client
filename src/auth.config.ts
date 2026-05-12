import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { postLogin } from "@/api/auth/endpoints"
import type { AuthUser } from "@/api/auth/types"

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.access_token = user.access_token
        token.access_token_expires = user.access_token_expires
        token.role = user.role
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token) {
        session.user.access_token = token.access_token
        session.user.access_token_expires = token.access_token_expires
        session.user.role = token.role
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isProtected = nextUrl.pathname.startsWith("/dashboard")
      if (isProtected) return isLoggedIn
      if (
        isLoggedIn &&
        (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
      ) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        try {
          const user: AuthUser = await postLogin(parsed.data)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            access_token: user.access_token,
            access_token_expires: user.access_token_expires,
          }
        } catch {
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
