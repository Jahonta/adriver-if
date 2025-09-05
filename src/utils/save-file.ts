export const saveFile = (content: string, name: string, type: string) => {
  const a = document.createElement('a')
  a.download = name
  a.href = URL.createObjectURL(new Blob([content], { type }))
  a.click()
  URL.revokeObjectURL(a.href)
}
