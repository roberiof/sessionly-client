import { HTTPError } from "ky"

import { httpClient } from "@/lib/httpClient"
import { AUTH_ENDPOINTS } from "./config"
import type { AuthUser, LoginBody, RegisterBody, AuthErrorCode } from "./types"

type ApiError = {
  message: string
  errorCode: AuthErrorCode
}

function toApiError(code: AuthErrorCode, message: string): ApiError {
  return { message, errorCode: code }
}

export async function postLogin(body: LoginBody): Promise<AuthUser> {
  try {
    return await httpClient
      .unauthorized()
      .post(AUTH_ENDPOINTS.login(), { json: body })
      .json<AuthUser>()
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 401 || error.response.status === 403) {
        throw toApiError("INVALID_CREDENTIALS", "Invalid email or password.")
      }
      throw toApiError(
        "SERVER_ERROR",
        "Something went wrong. Please try again.",
      )
    }
    throw toApiError("SERVER_ERROR", "Something went wrong. Please try again.")
  }
}

export async function postRegister(body: RegisterBody): Promise<AuthUser> {
  try {
    return await httpClient
      .unauthorized()
      .post(AUTH_ENDPOINTS.register(), { json: body })
      .json<AuthUser>()
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 409) {
        throw toApiError(
          "EMAIL_ALREADY_EXISTS",
          "An account with this email already exists.",
        )
      }
      throw toApiError(
        "SERVER_ERROR",
        "Something went wrong. Please try again.",
      )
    }
    throw toApiError("SERVER_ERROR", "Something went wrong. Please try again.")
  }
}
