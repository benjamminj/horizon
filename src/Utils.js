export const toUTC = (date) => {
  const args = [
    date.getFullYear(),
    date.getMonth(),
    date.getDay(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ]

  return Date.UTC(...args)
}

export default { toUTC }
