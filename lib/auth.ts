import { createHmac, timingSafeEqual } from "crypto"

export const SESSION_COOKIE_NAME = "admin_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET is not set")
  return secret
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex")
}

export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS)
  return `${expiry}.${sign(expiry)}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [expiry, signature] = token.split(".")
  if (!expiry || !signature) return false
  if (!Number.isFinite(Number(expiry)) || Date.now() > Number(expiry)) return false

  const expected = Buffer.from(sign(expiry))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length) return false
  return timingSafeEqual(expected, actual)
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
