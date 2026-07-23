import type { ComponentType } from 'react'

export type Level =0| 1 | 2 | 3 | 4

export type Task = {
  id: string
  title: string
  level: Level
  Component: ComponentType
}

export const levelNames: Record<Level, string> = {
  0: 'Level 0 — Testing board',
  1: 'Level 1 — Fresher',
  2: 'Level 2 — Junior+',
  3: 'Level 3 — Mid',
  4: 'Level 4 — Senior',
}
