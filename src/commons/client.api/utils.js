import tickerToSectorSubsectorSegment from './tickerToSectorSubsectorSegment'
import ticker2code from './ticker_to_code'

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

const simpleHumanTime = timestamp => {
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
    return seconds + 's'
  }
  if (diff < hour) {
    const minutes = Math.round(diff / minute)
    return minutes + 'min'
  }
  if (diff < day) {
    const hours = Math.round(diff / hour)
    return hours + 'h'
  }
  if (diff < week) {
    const days = Math.round(diff / day)
    return days + 'd'
  }
  if (diff < month) {
    const weeks = Math.round(diff / week)
    return weeks + 'sem'
  }
  const months = Math.round(diff / month)
  return months + (months === 1 ? ' mês' : ' meses')
}

const linkify = inputText => {
  // URLs starting with http://, https://, or ftp://
  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
  let replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>')

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>')

  // Change email addresses to mailto:: links.
  const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>')

  return replacedText
}

const extractUrls = inputText => {
  // URLs starting with http://, https://, or ftp://
  const pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
  const urls = inputText.match(pattern1)
  if (urls) {
    return urls
  }
  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).

  const pattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
  const urls2 = inputText.match(pattern2)
  if (urls2) {
    return urls2
  }
  return []
}

const getSector = ticker => {
  let cleanTicker = ticker
  if (ticker[ticker.length - 1] === 'F') {
    cleanTicker = ticker.substring(0, ticker.length - 1)
  }
  return tickerToSectorSubsectorSegment.tickerToSectorSubsectorSegment[cleanTicker].sector
}

const getSubsector = ticker => {
  let cleanTicker = ticker
  if (ticker[ticker.length - 1] === 'F') {
    cleanTicker = ticker.substring(0, ticker.length - 1)
  }
  return tickerToSectorSubsectorSegment.tickerToSectorSubsectorSegment[cleanTicker].subsector
}

const getSegment = ticker => {
  let cleanTicker = ticker
  if (ticker[ticker.length - 1] === 'F') {
    cleanTicker = ticker.substring(0, ticker.length - 1)
  }
  return tickerToSectorSubsectorSegment.tickerToSectorSubsectorSegment[cleanTicker].segment
}

const getCode = ticker => {
  return ticker2code.ticker2code[ticker]
}

const generateNotificationText = notificationType => {
  switch (notificationType) {
    case 'USER_COMMENT_EVENT':
      return 'comentou na sua postagem'
    case 'USER_FOLLOWED':
      return 'te seguiu'
    case 'USER_LIKE_EVENT':
      return 'curtiu sua postagem'
    case 'USER_TAGGED_COMMENT_EVENT':
      return 'te marcou em um comentário'
    default:
      return ': nova notificação'
  }
}

const generateNotificationRedirectLink = notification => {
  const notificationType = notification.type
  switch (notificationType) {
    case 'USER_COMMENT_EVENT':
      return `/events/${notification.data.eventId}`
    case 'USER_LIKE_EVENT':
      return `/events/${notification.data.eventId}`
    case 'USER_TAGGED_COMMENT_EVENT':
      return `/events/${notification.data.eventId}`
    case 'USER_FOLLOWED':
      return `/users/${notification.user.username}`
    default:
      return ': nova notificação'
  }
}

export default {
  thumbUrl,
  humanTime,
  simpleHumanTime,
  extractUrls,
  getSector,
  getSubsector,
  getSegment,
  getCode,
  generateNotificationText,
  generateNotificationRedirectLink
}
