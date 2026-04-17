export const formatDate = (date?: string, time?: string) => {
  if (!date) return 'Date not available';

  try {
    const d = new Date(`${date}T${time || '00:00:00'}`);
    return d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return date;
  }
};