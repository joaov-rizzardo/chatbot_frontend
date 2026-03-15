import { MessageCircle } from "lucide-react"

export function ConversationEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[oklch(0.10_0.02_150)]">
      <div className="w-16 h-16 rounded-2xl bg-[oklch(0.16_0.04_150)] flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-[oklch(0.40_0.08_148)]" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-[oklch(0.65_0.03_150)] mb-1">
          Nenhuma conversa selecionada
        </h3>
        <p className="text-xs text-[oklch(0.42_0.03_150)] max-w-[200px] leading-relaxed">
          Selecione uma conversa na lista ao lado para começar
        </p>
      </div>
    </div>
  )
}
