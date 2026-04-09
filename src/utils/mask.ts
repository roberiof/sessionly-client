const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const formatDateTime = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 12)

  const dd = digits.slice(0, 2)
  const mm = digits.slice(2, 4)
  const yyyy = digits.slice(4, 8)
  const hhRaw = digits.slice(8, 10)
  const minRaw = digits.slice(10, 12)

  const hh =
    hhRaw.length === 2
      ? String(clamp(Number(hhRaw), 0, 23)).padStart(2, "0")
      : hhRaw
  const min =
    minRaw.length === 2
      ? String(clamp(Number(minRaw), 0, 59)).padStart(2, "0")
      : minRaw

  let formatted = ""

  if (dd) formatted += dd
  if (mm) formatted += `/${mm}`
  if (yyyy) formatted += `/${yyyy}`
  if (hh) formatted += `, ${hh}`
  if (min) formatted += `:${min}`

  return formatted
}

const formatCurrency = (value: string) => {
  const digits = value.replace(/\D/g, "")
  const amount = Number(digits) / 100

  if (Number.isNaN(amount) || digits.length === 0) {
    return ""
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
}

const parseCurrency = (value: string) => {
  const digits = value.replace(/\D/g, "")
  return Number(digits) / 100
}

export const Mask = {
  dateTime: formatDateTime,
  currency: formatCurrency,
  parseCurrency,
}
