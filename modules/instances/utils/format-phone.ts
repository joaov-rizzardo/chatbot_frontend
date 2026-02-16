export function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, "")

    // Brazil: +55 XX XXXXX-XXXX
    if (digits.startsWith("55") && digits.length === 13) {
        const ddd = digits.slice(2, 4)
        const part1 = digits.slice(4, 9)
        const part2 = digits.slice(9, 13)
        return `+55 (${ddd}) ${part1}-${part2}`
    }

    // US: +1 (XXX) XXX-XXXX
    if (digits.startsWith("1") && digits.length === 11) {
        const area = digits.slice(1, 4)
        const part1 = digits.slice(4, 7)
        const part2 = digits.slice(7, 11)
        return `+1 (${area}) ${part1}-${part2}`
    }

    return phone
}
