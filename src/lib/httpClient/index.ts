import ky from "ky"
import type { BeforeRequestState } from "ky"
import { getSession } from "next-auth/react"

const kyBase = ky.create({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"}/`,
  headers: { "Content-Type": "application/json" },
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
