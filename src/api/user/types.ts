export type User = {
  id: string
  name: string
  email: string
  role: "MENTOR" | "CLIENT" | "ADMIN"
  avatarUrl?: string
}

export type CreateUserBody = {
  name: string
  bio: string
  email: string
  password: string
  role: "MENTOR" | "CLIENT"
  avatarUrl?: string
  links?: string[]
  mentorProfile?: { niche: string; specialties: string[] }
  clientProfile?: { interests: string[] }
}

export type UserErrorCode =
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_INPUT"
  | "SERVER_ERROR"
