// @flow
import React from 'react'
import {Box, Icon, Text} from '../../../common-adapters'
import {PopupHeaderText} from '../../../common-adapters/popup-menu'
import {globalStyles, globalMargins, globalColors} from '../../../styles'
import {formatTimeForPopup, formatTimeForRevoked} from '../../../util/timestamp'
import {isMobile} from '../../../constants/platform'

import type {TextMessage, AttachmentMessage} from '../../../constants/chat'
import type {IconType} from '../../../common-adapters/icon'

function iconNameForDeviceType(deviceType: string, isRevoked: boolean): IconType {
  if (!isMobile) {
    switch (deviceType) {
      case 'mobile':
        return isRevoked ? 'icon-fancy-revoked-phone-122-x-64' : 'icon-fancy-encrypted-phone-122-x-64'
      default:
        return isRevoked ? 'icon-fancy-revoked-computer-150-x-64' : 'icon-fancy-encrypted-computer-150-x-64'
    }
  } else {
    switch (deviceType) {
      case 'mobile':
        return isRevoked ? 'icon-fancy-revoked-phone-183-x-96' : 'icon-fancy-encrypted-phone-183-x-96'
      default:
        return isRevoked ? 'icon-fancy-revoked-computer-226-x-96' : 'icon-fancy-encrypted-computer-226-x-96'
    }
  }
}

const MessagePopupHeader = ({
  message: {author, deviceName, deviceType, timestamp, senderDeviceRevokedAt, you},
  isLast,
}: {
  message: TextMessage | AttachmentMessage,
  isLast?: boolean,
}) => {
  const iconName = iconNameForDeviceType(deviceType, !!senderDeviceRevokedAt)
  const whoRevoked = author === you ? 'You' : author
  return (
    <Box
      style={{
        ...globalStyles.flexBoxColumn,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Icon
        type={iconName}
        style={{
          marginBottom: globalMargins.tiny,
          marginTop: !isMobile ? -globalMargins.tiny : -globalMargins.large,
        }}
      />
      <Box style={globalStyles.flexBoxRow}>
        <Text
          type="BodySmall"
          style={{color: senderDeviceRevokedAt ? globalColors.black_40 : globalColors.green2}}
        >
          ENCRYPTED
        </Text>
        <Text
          type="BodySmall"
          style={{color: senderDeviceRevokedAt ? globalColors.black_40 : globalColors.green2}}
        >
          &nbsp;& SIGNED
        </Text>
      </Box>
      <Box style={globalStyles.flexBoxRow}>
        <Text type="BodySmall" style={{color: globalColors.black_40}}>by</Text>
        <Text type="BodySmallItalic" style={{color: globalColors.black_60}}>&nbsp;{deviceName}</Text>
      </Box>
      <Text type="BodySmall" style={{color: globalColors.black_40}}>{formatTimeForPopup(timestamp)}</Text>
      {senderDeviceRevokedAt &&
        <PopupHeaderText
          color={globalColors.white}
          backgroundColor={globalColors.blue}
          style={{
            marginTop: globalMargins.small,
            ...(isLast
              ? {borderBottomLeftRadius: 3, borderBottomRightRadius: 3, marginBottom: -globalMargins.small}
              : {}),
            width: '100%',
          }}
        >
          {whoRevoked} revoked this device on {formatTimeForRevoked(senderDeviceRevokedAt)}.
        </PopupHeaderText>}
    </Box>
  )
}

export default MessagePopupHeader
