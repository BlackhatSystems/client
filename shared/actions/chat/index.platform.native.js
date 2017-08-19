// @flow
import {getSessionState} from 'electron-notification-state'

console.log(getSessionState())

function isSessionActive() {
  return true
}

export {isSessionActive}
