import { httpClient } from "@/lib/httpClient"
import { AUTH_ENDPOINTS } from "./config"
import type { AuthUser, LoginBody, RegisterBody } from "./types"

export async function postLogin(body: LoginBody): Promise<AuthUser> {
  return httpClient
    .unauthorized()
    .post(AUTH_ENDPOINTS.login(), { json: body })
    .json<AuthUser>()
}

export async function postRegister(body: RegisterBody): Promise<AuthUser> {
  return httpClient
    .unauthorized()
    .post(AUTH_ENDPOINTS.register(), { json: body })
    .json<AuthUser>()
}
