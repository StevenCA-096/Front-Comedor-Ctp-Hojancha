export const formatDateWithDaysAndHour = (date) => {
  return date.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Costa_Rica',
    hourCycle: 'h12'
  })
}

export const formatDateWithDays = (date) => {
  return date.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Costa_Rica',
  })
}

export const formatDateStringWithDays = (dateString) => {
  // Si viene como string ISO (YYYY-MM-DD)
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
  
  return date.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Costa_Rica',
  });
}

export const formatDateWithHoursHonly = (date) => {
  return date.toLocaleDateString('es', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Costa_Rica',
    hourCycle: 'h12'
  })
}
