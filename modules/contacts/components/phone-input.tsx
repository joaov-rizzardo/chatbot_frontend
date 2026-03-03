"use client"

import { useState, useRef, useEffect } from "react"
import {
  getCountries,
  getCountryCallingCode,
  AsYouType,
  parsePhoneNumber,
  type CountryCode,
} from "libphonenumber-js/max"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command"

// ─── Country data ─────────────────────────────────────────────────────────────

function toFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("")
}

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["pt-BR"], { type: "region" })
  } catch {
    return null
  }
})()

function getCountryName(code: string): string {
  return regionNames?.of(code) ?? code
}

const PRIORITY: CountryCode[] = [
  "BR", "PT", "US", "ES", "AR", "MX", "GB", "FR", "DE", "IT", "CO", "CL", "PE",
]

interface CountryOption {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
}

function buildOptions(): { priority: CountryOption[]; rest: CountryOption[] } {
  const all = getCountries()
  const priorityCodes = PRIORITY.filter((c) => all.includes(c))
  const restCodes = all
    .filter((c) => !PRIORITY.includes(c))
    .sort((a, b) => getCountryName(a).localeCompare(getCountryName(b), "pt-BR"))

  const toOption = (code: CountryCode): CountryOption => ({
    code,
    name: getCountryName(code),
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: toFlagEmoji(code),
  })

  return {
    priority: priorityCodes.map(toOption),
    rest: restCodes.map(toOption),
  }
}

const { priority: PRIORITY_OPTIONS, rest: REST_OPTIONS } = buildOptions()

// ─── Component ────────────────────────────────────────────────────────────────

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  hasError?: boolean
}

export function PhoneInput({ value, onChange, onBlur, disabled, hasError }: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>("BR")
  const [national, setNational] = useState("")
  const [open, setOpen] = useState(false)

  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Initialize from value on mount only
  useEffect(() => {
    if (!value) return
    try {
      const parsed = parsePhoneNumber(value)
      if (parsed?.country) {
        setCountry(parsed.country)
        const formatter = new AsYouType(parsed.country)
        setNational(formatter.input(parsed.nationalNumber))
      }
    } catch {
      // ignore invalid values
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleNationalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    const newDigits = newValue.replace(/\D/g, "")
    const oldDigits = national.replace(/\D/g, "")

    // User deleted a formatting character only (digits unchanged, string shorter):
    // let the raw edit stand so the character isn't immediately re-inserted.
    // E.164 is also unchanged since the digits didn't change.
    if (newDigits === oldDigits && newValue.length < national.length) {
      setNational(newValue)
      return
    }

    // Digits changed — reformat normally.
    const formatter = new AsYouType(country)
    const formatted = newDigits ? formatter.input(newDigits) : ""
    setNational(formatted)
    const phone = formatter.getNumber()
    onChange(phone?.format("E.164") ?? "")
  }

  function handleNationalBlur() {
    // Tidy up any partially-deleted formatting characters on blur.
    const digits = national.replace(/\D/g, "")
    if (digits) {
      const formatter = new AsYouType(country)
      setNational(formatter.input(digits))
    }
    onBlur?.()
  }

  function handleCountrySelect(code: CountryCode) {
    setCountry(code)
    setOpen(false)
    if (national) {
      const digits = national.replace(/\D/g, "")
      const formatter = new AsYouType(code)
      const formatted = formatter.input(digits)
      setNational(formatted)
      const phone = formatter.getNumber()
      onChange(phone?.format("E.164") ?? "")
    }
    phoneInputRef.current?.focus()
  }

  const selected =
    PRIORITY_OPTIONS.find((c) => c.code === country) ??
    REST_OPTIONS.find((c) => c.code === country) ??
    PRIORITY_OPTIONS[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Unified input — trigger wraps only the country button */}
      <div
        className={cn(
          "flex h-9 rounded-md border border-input bg-background",
          "ring-offset-background transition-colors",
          "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
          hasError && "border-destructive focus-within:ring-destructive",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 pl-3 pr-2 border-r border-input shrink-0",
              "rounded-l-md text-sm hover:bg-accent transition-colors focus:outline-none",
              open && "bg-accent",
            )}
          >
            <span className="text-base leading-none">{selected.flag}</span>
            <span className="text-xs font-medium text-muted-foreground tabular-nums min-w-7">
              {selected.dialCode}
            </span>
            <ChevronDown
              className={cn(
                "h-3 w-3 text-muted-foreground/60 transition-transform duration-150",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>

        <input
          ref={phoneInputRef}
          type="tel"
          inputMode="numeric"
          value={national}
          onChange={handleNationalChange}
          onBlur={handleNationalBlur}
          disabled={disabled}
          placeholder="(00) 00000-0000"
          className="flex-1 min-w-0 rounded-r-md bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Rendered in a Portal — always escapes overflow/dialog clipping */}
      <PopoverContent align="start" className="w-70 p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." className="h-9" />
          <CommandList onWheel={(e) => e.stopPropagation()}>
            <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
            <CommandGroup heading="Populares">
              {PRIORITY_OPTIONS.map((opt) => (
                <CommandItem
                  key={opt.code}
                  value={`${opt.code} ${opt.name} ${opt.dialCode}`}
                  onSelect={() => handleCountrySelect(opt.code)}
                  className="gap-2.5"
                >
                  <span className="text-base leading-none w-5 shrink-0 text-center">{opt.flag}</span>
                  <span className="flex-1 truncate">{opt.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{opt.dialCode}</span>
                  {country === opt.code && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Todos os países">
              {REST_OPTIONS.map((opt) => (
                <CommandItem
                  key={opt.code}
                  value={`${opt.code} ${opt.name} ${opt.dialCode}`}
                  onSelect={() => handleCountrySelect(opt.code)}
                  className="gap-2.5"
                >
                  <span className="text-base leading-none w-5 shrink-0 text-center">{opt.flag}</span>
                  <span className="flex-1 truncate">{opt.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{opt.dialCode}</span>
                  {country === opt.code && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
