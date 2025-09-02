export const getPageGroups = (total: number, current: number) => {
  if (total < 2) {
    return { first: false, center: [], last: false }
  }

  if (total < 7) {
    return {
      fisrt: false,
      center: Array.from({ length: total }, (_, i) => i),
      last: false
    }
  }

  const first = current > 1
  const center = [current]
  if (current > 0) {
    center.unshift(current - 1)
  }
  if (current < total - 1) {
    center.push(current + 1)
  }
  const last = total - current > 2

  return { first, center, last }
}
