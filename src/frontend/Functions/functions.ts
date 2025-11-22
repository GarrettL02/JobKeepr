export function formatDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
