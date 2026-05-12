import { useMutation, type UseMutationOptions } from "@tanstack/react-query"

import { AUTH_MUTATION_KEYS } from "../config"
import { postRegister } from "../endpoints"
import type { AuthUser, RegisterBody } from "../types"

type UseRegisterOptions = {
  options?: UseMutationOptions<AuthUser, Error, RegisterBody>
}

export function useRegister({ options }: UseRegisterOptions = {}) {
  return useMutation<AuthUser, Error, RegisterBody>({
    ...options,
    mutationKey: AUTH_MUTATION_KEYS.register(),
    mutationFn: (body) => postRegister(body),
  })
}
