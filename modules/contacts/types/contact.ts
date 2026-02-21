export interface Contact {
  id: string
  name: string
  phone: string
  email?: string
  avatarUrl?: string
  tags: string[]
  lastActivityAt?: string
  createdAt: string
}

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Ana Souza",
    phone: "+55 11 91234-5678",
    email: "ana.souza@email.com",
    tags: ["cliente", "vip"],
    lastActivityAt: "2026-02-20T14:30:00Z",
    createdAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    phone: "+55 21 98765-4321",
    email: "carlos.mendes@empresa.com",
    tags: ["lead"],
    lastActivityAt: "2026-02-19T09:15:00Z",
    createdAt: "2025-11-15T08:00:00Z",
  },
  {
    id: "3",
    name: "Fernanda Lima",
    phone: "+55 31 97654-3210",
    tags: ["cliente"],
    lastActivityAt: "2026-01-10T17:00:00Z",
    createdAt: "2025-09-20T11:00:00Z",
  },
  {
    id: "4",
    name: "Roberto Alves",
    phone: "+55 41 96543-2109",
    email: "roberto@gmail.com",
    tags: ["lead", "potencial"],
    lastActivityAt: "2026-02-21T08:00:00Z",
    createdAt: "2026-01-05T09:30:00Z",
  },
  {
    id: "5",
    name: "Mariana Costa",
    phone: "+55 51 95432-1098",
    email: "mariana.costa@hotmail.com",
    tags: ["vip", "suporte"],
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
    tags: ["cliente", "suporte"],
    lastActivityAt: "2026-02-20T11:20:00Z",
    createdAt: "2025-07-15T09:00:00Z",
  },
  {
    id: "8",
    name: "Diego Santos",
    phone: "+55 81 92109-8765",
    tags: ["lead"],
    lastActivityAt: "2025-12-30T10:00:00Z",
    createdAt: "2025-10-20T15:00:00Z",
  },
]
