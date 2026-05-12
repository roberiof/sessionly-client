import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { HTTPError } from "ky"

import { AUTH_MUTATION_KEYS } from "../config"
import { postRegister } from "../endpoints"
import type { AuthErrorCode, AuthUser, RegisterBody } from "../types"

export type RegisterError = Error & { errorCode: AuthErrorCode }

type UseRegisterOptions = {
  options?: UseMutationOptions<AuthUser, RegisterError, RegisterBody>
}

export function useRegister({ options }: UseRegisterOptions = {}) {
  return useMutation<AuthUser, RegisterError, RegisterBody>({
    ...options,
    mutationKey: AUTH_MUTATION_KEYS.register(),
    mutationFn: async (body) => {
      try {
        return await postRegister(body)
      } catch (error) {
        if (error instanceof HTTPError) {
          const code: AuthErrorCode =
            error.response.status === 409
              ? "EMAIL_ALREADY_EXISTS"
              : "SERVER_ERROR"
          throw Object.assign(new Error() as RegisterError, { errorCode: code })
        }
        throw Object.assign(new Error() as RegisterError, {
          errorCode: "SERVER_ERROR" as AuthErrorCode,
        })
      }
    },
  })
}
