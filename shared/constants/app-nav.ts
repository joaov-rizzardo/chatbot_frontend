export const APP_NAV_ITEMS = [
  { label: "Conversas", href: "/app/conversations", icon: "MessageCircle" },
  { label: "Contatos", href: "/app/contacts", icon: "Users" },
  { label: "Chatbots", href: "/app/chatbots", icon: "Bot" },
  { label: "Automações", href: "/app/automations", icon: "Workflow" },
  { label: "Campanhas", href: "/app/campaigns", icon: "Send" },
  { label: "Relatórios", href: "/app/reports", icon: "BarChart3" },
  { label: "Configurações", href: "/app/settings", icon: "Settings" },
] as const

export const APP_PLAN = {
  name: "Profissional",
  usage: 6500,
  limit: 10000,
  unit: "mensagens",
} as const
