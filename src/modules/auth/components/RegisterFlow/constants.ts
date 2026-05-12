import type { UserErrorCode } from "@/api/user/types"

export const REGISTER_ERROR_MESSAGES: Record<UserErrorCode, string> = {
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  INVALID_INPUT: "Please check your input and try again.",
  SERVER_ERROR: "Something went wrong on our end. Try again later.",
}
