export const formatMoney = (value) => {
  if (value === null || value === undefined) return null
  if (typeof value !== 'string') value = value.toString()
  return value.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
