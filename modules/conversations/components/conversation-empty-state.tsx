import { MessageCircle } from "lucide-react"

export function ConversationEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[oklch(0.95_0.02_150)]">
      <div className="w-16 h-16 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Nenhuma conversa selecionada
        </h3>
        <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
          Selecione uma conversa na lista ao lado para começar
        </p>
      </div>
    </div>
  )
}
