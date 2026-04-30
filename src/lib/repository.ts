import { Application, ApplicationInput } from '@/types/application'

const STORAGE_KEY = 'cv_tracker_applications'

export interface ApplicationRepository {
  getAll(): Application[]
  getById(id: string): Application | null
  create(input: ApplicationInput): Application
  update(id: string, input: Partial<ApplicationInput>): Application | null
  delete(id: string): void
}

function load(): Application[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(apps: Application[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
}

export const repository: ApplicationRepository = {
  getAll: () => load(),

  getById: (id) => load().find((a) => a.id === id) ?? null,

  create(input) {
    const apps = load()
    const created: Application = { ...input, id: crypto.randomUUID() }
    save([...apps, created])
    return created
  },

  update(id, input) {
    const apps = load()
    const idx = apps.findIndex((a) => a.id === id)
    if (idx === -1) return null
    apps[idx] = { ...apps[idx], ...input }
    save(apps)
    return apps[idx]
  },

  delete(id) {
    save(load().filter((a) => a.id !== id))
  },
}
