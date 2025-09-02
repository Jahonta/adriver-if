export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(
    'ru-RU',
    { 'dateStyle': 'short', 'timeStyle': 'short' }
  ).format(date).replace(',', '')
}
