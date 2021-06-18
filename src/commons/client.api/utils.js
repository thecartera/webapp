
const thumbUrl = ticker => {
  return `https://raw.githubusercontent.com/monneda/B3-Assets-Images/main/imgs/${ticker}.png`
}

const humanTime = timestamp => {
  const diff = Date.now() - Date.parse(timestamp)
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  if (diff < second) {
    return 'agora'
  }
  if (diff < minute) {
    const seconds = Math.round(diff / second)
    return 'há ' + seconds + (seconds === 1 ? ' segundo' : ' segundos')
  }
  if (diff < hour) {
    const minutes = Math.round(diff / minute)
    return 'há ' + minutes + (minutes === 1 ? ' minuto' : ' minutos')
  }
  if (diff < day) {
    const hours = Math.round(diff / hour)
    return 'há ' + hours + (hours === 1 ? ' hora' : ' horas')
  }
  if (diff < week) {
    const days = Math.round(diff / day)
    return 'há ' + days + (days === 1 ? ' dia' : ' dias')
  }
  if (diff < month) {
    const weeks = Math.round(diff / week)
    return 'há ' + weeks + (weeks === 1 ? ' semana' : ' semanas')
  }
  const months = Math.round(diff / month)
  return 'há ' + months + (months === 1 ? ' mês' : ' meses')
}

export default {
  thumbUrl,
  humanTime
}
