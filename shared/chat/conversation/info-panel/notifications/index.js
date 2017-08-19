// @flow
import React from 'react'
import {List} from 'immutable'
import {Box, Checkbox, ClickableBox, Avatar, Text, Usernames, Divider, Icon} from '../../../../common-adapters'
import {globalStyles, globalMargins} from '../../../../styles'

type Props = {
  desktop: string,
  mobile: string,
  onSetDesktop: () => void,
  onSetMobile: () => void,
}

const Notifications = ({desktop, mobile, onSetDesktop, onSetMobile}: Props) => (
  <Box style={{...globalStyles.flexBoxColumn, paddingTop: globalMargins.tiny}}>
    <Checkbox
      style={{marginTop: globalMargins.small}}
      onCheck={() => console.log('onCheck')}
      checked={desktop === 'atmention'}
      label={'foo'}
    />
  </Box>
)

export default Notifications
