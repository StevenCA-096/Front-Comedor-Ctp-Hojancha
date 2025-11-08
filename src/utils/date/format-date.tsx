
//RETURN EXAMPLE: 30 de septiembre de 2025, 08:58 p. m.	
export const formatDateWithDaysAndHour = (date:Date) => {
  return date?.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Costa_Rica',
    hourCycle: 'h12'
  })
}

export const formatDateWithDays = (date: Date) => {
  return date?.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Costa_Rica',
  })
}

export const formatDateStringWithDays = (dateString: string) => {
  // Si viene como string ISO (YYYY-MM-DD)
  const [year, month, day] = dateString?.split('-');
  const date = new Date(parseInt(year),parseInt(month) - 1, parseInt(day)); // month - 1 porque los meses van de 0-11
  
  return date?.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Costa_Rica',
  });
}

export const formatDateWithHoursHonly = (date:Date) => {
  return date.toLocaleDateString('es', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Costa_Rica',
    hourCycle: 'h12'
  })
}
