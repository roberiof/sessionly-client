import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    access_token: string
    access_token_expires: number
    role: "MENTOR" | "CLIENT" | "ADMIN"
  }

  interface Session extends DefaultSession {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    access_token_expires: number
    role: "MENTOR" | "CLIENT" | "ADMIN"
  }
}
