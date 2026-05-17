const defineRoute = (fn: () => string) => (): string => fn()

const defineMutationKey = (key: string) => (): readonly [string] =>
  [key] as const

export const AUTH_ENDPOINTS = {
  login: defineRoute(() => "auth/login"),
  register: defineRoute(() => "auth/register"),
} as const

export const AUTH_MUTATION_KEYS = {
  login: defineMutationKey("auth-login"),
  register: defineMutationKey("auth-register"),
} as const
