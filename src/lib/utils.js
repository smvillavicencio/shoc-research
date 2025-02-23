import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Buffer } from 'buffer'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const encodeUUID = (uuid) => {
  // const inputArray = [...input].map((char) => char.charCodeAt(0))

  // return hashids.encode(inputArray);
  return Buffer.from(uuid.replace(/-/g, ''), 'hex')
    .toString('base64')
    .toString('base64') // Convert to base64
    .replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=+$/, '') // Remove trailing '=' padding
}

export const decodeUUID = (encodedUuid) => {
  // Add padding to make the length of the base64url string a multiple of 4
  let base64 =
    encodedUuid
      .replace(/-/g, '+') // Convert '-' back to '+'
      .replace(/_/g, '/') + // Convert '_' back to '/'
    '='.repeat((4 - (encodedUuid.length % 4)) % 4) // Add necessary padding

  // Decode the base64 string into a buffer
  const buffer = Buffer.from(base64, 'base64')

  // Convert the buffer to a hex string and format it as a UUID (insert dashes)
  const hex = buffer.toString('hex')
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`

  return uuid
}
