// @flow
import {isWindows, isIOS} from '../../constants/platform'
import {getSessionState} from 'electron-notification-state'

function isSessionActive() {
  const notificationState = getSessionState()
  if (isWindows && notificationState === 'QUNS_ACCEPTS_NOTIFICATIONS') {
    return true
  }
  if (isIOS && notificationState === 'SESSION_ON_CONSOLE_KEY') {
    return true
  }
  if (!isWindows && !isIOS && notificationState === 'UNKNOWN_ERROR') {
    return true
  }
  console.log('Inactive session state: ', notificationState)
  return false
}

export {isSessionActive}
