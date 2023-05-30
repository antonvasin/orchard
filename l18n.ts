export function currency(
  num: number,
  currency: string,
  locale?: string,
) {
  return Intl.NumberFormat(locale, { currency }).format(num);
}
