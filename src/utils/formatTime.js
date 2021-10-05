/* default date format 2021-09-22T21:40:49.024+1000 */
export function formatDate(dateStr, format = 'yyyy/mm/dd') {
  let str = String(dateStr).substring(0, 10)

  const [y, m, d] = str.split('-')

  const monthDict = [
    'Jar',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jue',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  return `${y}/${d}/${monthDict[Number(m) - 1]}`

  // if (format == 'yyyy/mm/dd') {
  //   return `${y}/${m - 0 + 1 > 9 ? m - 0 + 1 : '0' + m}/${
  //     d - 0 > 9 ? d - 0 : '0' + d
  //   }`
  // }
}
