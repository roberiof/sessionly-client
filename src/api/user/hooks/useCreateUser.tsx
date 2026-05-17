import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { HTTPError } from "ky"

import { USER_MUTATION_KEYS } from "../config"
import { postCreateUser } from "../endpoints"
import type { CreateUserBody, User, UserErrorCode } from "../types"

export type CreateUserError = Error & { errorCode: UserErrorCode }

type UseCreateUserOptions = {
  options?: UseMutationOptions<User, CreateUserError, CreateUserBody>
}

export function useCreateUser({ options }: UseCreateUserOptions = {}) {
  return useMutation<User, CreateUserError, CreateUserBody>({
    ...options,
    mutationKey: USER_MUTATION_KEYS.create(),
    mutationFn: async (body) => {
      try {
        return await postCreateUser(body)
      } catch (error) {
        if (error instanceof HTTPError) {
          const code: UserErrorCode =
            error.response.status === 409
              ? "EMAIL_ALREADY_EXISTS"
              : error.response.status === 400
                ? "INVALID_INPUT"
                : "SERVER_ERROR"
          throw Object.assign(new Error() as CreateUserError, { errorCode: code })
        }
        throw Object.assign(new Error() as CreateUserError, {
          errorCode: "SERVER_ERROR" as UserErrorCode,
        })
      }
    },
  })
}
