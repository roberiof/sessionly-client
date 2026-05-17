import { httpClient } from "@/lib/httpClient"
import { USER_ENDPOINTS } from "./config"
import type { CreateUserBody, User } from "./types"

export async function postCreateUser(body: CreateUserBody): Promise<User> {
  return httpClient
    .unauthorized()
    .post(USER_ENDPOINTS.create(), { json: body })
    .json<User>()
}
