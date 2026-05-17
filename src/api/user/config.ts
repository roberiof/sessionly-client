const defineRoute = (fn: () => string) => (): string => fn()

const defineMutationKey = (key: string) => (): readonly [string] =>
  [key] as const

export const USER_ENDPOINTS = {
  create: defineRoute(() => "users"),
} as const

export const USER_MUTATION_KEYS = {
  create: defineMutationKey("user-create"),
} as const
