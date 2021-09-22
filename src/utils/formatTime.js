/* default date format 2021-09-22T21:40:49.024+1000 */
export function formatDate(dateStr, format = 'yyyy/mm/dd') {
  let str = String(dateStr).substring(0, 10)

  const [y, m, d] = str.split('-')

  if (format == 'yyyy/mm/dd') {
    return `${y}/${m + 1 > 10 ? m + 1 : '0' + m}/${d > 10 ? d : '0' + d}`
  }
}
