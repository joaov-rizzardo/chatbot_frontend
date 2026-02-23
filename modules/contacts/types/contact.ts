import type { TagColor } from "@/modules/tags/types/tag"

export interface ContactTag {
  id: string
  name: string
  color: TagColor
}

export interface Contact {
  id: string
  name: string
  phone: string
  email?: string
  avatarUrl?: string
  tags: ContactTag[]
  lastActivityAt?: string
  createdAt: string
}

export interface ContactFilters {
  tags: string[]           // tag IDs
  hasEmail: boolean | null
  hasTags: boolean | null
  activityRange: "any" | "24h" | "7d" | "30d" | "90d" | "never"
  createdRange: "any" | "24h" | "7d" | "30d" | "90d" | "180d"
}

export const DEFAULT_FILTERS: ContactFilters = {
  tags: [],
  hasEmail: null,
  hasTags: null,
  activityRange: "any",
  createdRange: "any",
}

// Shared tag objects to avoid repetition
const TAG_CLIENTE: ContactTag = { id: "t-3", name: "cliente", color: "emerald" }
const TAG_VIP: ContactTag     = { id: "t-1", name: "vip",     color: "amber"   }
const TAG_LEAD: ContactTag    = { id: "t-2", name: "lead",    color: "blue"    }
const TAG_SUPORTE: ContactTag = { id: "t-4", name: "suporte", color: "violet"  }
const TAG_POT: ContactTag     = { id: "t-5", name: "potencial", color: "orange" }

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Ana Souza",
    phone: "+55 11 91234-5678",
    email: "ana.souza@email.com",
    tags: [TAG_CLIENTE, TAG_VIP],
    lastActivityAt: "2026-02-20T14:30:00Z",
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    phone: "+55 21 98765-4321",
    email: "carlos.mendes@empresa.com",
    tags: [TAG_LEAD],
    lastActivityAt: "2026-02-19T09:15:00Z",
    createdAt: "2025-11-15T08:00:00Z",
  },
  {
    id: "3",
    name: "Fernanda Lima",
    phone: "+55 31 97654-3210",
    tags: [TAG_CLIENTE],
    lastActivityAt: "2026-01-10T17:00:00Z",
    createdAt: "2025-09-20T11:00:00Z",
  },
  {
    id: "4",
    name: "Roberto Alves",
    phone: "+55 41 96543-2109",
    email: "roberto@gmail.com",
    tags: [TAG_LEAD, TAG_POT],
    lastActivityAt: "2026-02-21T08:00:00Z",
    createdAt: "2026-01-05T09:30:00Z",
  },
  {
    id: "5",
    name: "Mariana Costa",
    phone: "+55 51 95432-1098",
    email: "mariana.costa@hotmail.com",
    tags: [TAG_VIP, TAG_SUPORTE],
    lastActivityAt: "2026-02-18T16:45:00Z",
    createdAt: "2025-08-10T14:00:00Z",
  },
  {
    id: "6",
    name: "Paulo Ribeiro",
    phone: "+55 61 94321-0987",
    tags: [],
    createdAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "7",
    name: "Juliana Ferreira",
    phone: "+55 71 93210-9876",
    email: "juliana.ferreira@empresa.com.br",
    tags: [TAG_CLIENTE, TAG_SUPORTE],
    lastActivityAt: "2026-02-20T11:20:00Z",
    createdAt: "2025-07-15T09:00:00Z",
  },
  {
    id: "8",
    name: "Diego Santos",
    phone: "+55 81 92109-8765",
    tags: [TAG_LEAD],
    lastActivityAt: "2025-12-30T10:00:00Z",
    createdAt: "2025-10-20T15:00:00Z",
  },
]
