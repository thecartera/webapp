import Client from './client'

export default class extends Client {
  getNotifications (size, beforeId) {
    if (beforeId && size) {
      return this.request('GET', `notifications?size=${size}&before_id=${beforeId}`)
    } else if (size) {
      return this.request('GET', `notifications?size=${size}`)
    } else {
      return this.request('GET', 'notifications?size=10')
    }
  }

  getUnreadNotificationsCount () {
    return this.request('GET', 'notifications/count')
  }
}
