export type AuthUser = {
  id: string
  name: string
  email: string
  role: "MENTOR" | "CLIENT" | "ADMIN"
  avatarUrl?: string
  access_token: string
  access_token_expires: number
}

export type LoginBody = {
  email: string
  password: string
}

export type RegisterBody = {
  name: string
  email: string
  password: string
  role: "MENTOR" | "CLIENT"
  niche?: string
  specialties?: string[]
  chatPrice?: number
  interests?: string[]
}

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_INPUT"
  | "SERVER_ERROR"
