import ky from "ky"
import type { BeforeRequestState } from "ky"
import { getSession } from "next-auth/react"

// ky v2 passes fetch(request, init) where init is non-null even when empty.
// Node.js undici then tries to clone/re-extract the body, which fails because
// ky's duplex:'half' flag causes the body to be stored as a stream with null source.
// Providing a custom fetch that omits init when input is already a Request avoids the clone step.
const nodeSafeFetch: typeof fetch = (input, init) =>
  input instanceof Request
    ? globalThis.fetch(input)
    : globalThis.fetch(input, init)

const kyBase = ky.create({
  prefix: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"}/`,
  headers: { "Content-Type": "application/json" },
  fetch: nodeSafeFetch,
})

async function addBearerToken({ request }: BeforeRequestState) {
  const session = await getSession()
  const token = (session?.user as { access_token?: string } | undefined)
    ?.access_token
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`)
  }
}

export const httpClient = {
  authorized: () =>
    kyBase.extend({
      hooks: { beforeRequest: [addBearerToken] },
    }),
  unauthorized: () => kyBase.extend({ hooks: { beforeRequest: [] } }),
}
