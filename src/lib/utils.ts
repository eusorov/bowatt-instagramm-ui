import { twMerge } from 'tailwind-merge'

type ClassValue = string | undefined | null | false

export function cn(...inputs: ClassValue[]) {
  return twMerge(inputs.filter(Boolean).join(' '))
}

export function parseTagsInput(input: string): string[] {
  return input
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function serializeTags(tags: string[]): string {
  return tags.join(',')
}
