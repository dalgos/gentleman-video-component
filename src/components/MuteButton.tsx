import React, { FC, MouseEventHandler } from 'react'
import styled from 'styled-components'
import LottieToggleButton from 'modules/lottie-button'

import muteAniData from 'assets/json/ic_volume_on_w_24.json'
import unmuteAniData from 'assets/json/ic_volume_off_w_24.json'

interface Props {
  isMuted: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  volume: number;
}

const Button = styled(LottieToggleButton)`
  width: 48px;
  height: 48px;
  display: block;
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  margin: 8px;
  box-sizing: border-box;
  padding: 12px;
  float: left;
`

const MuteButton: FC<Props> = ({
  onClick,
}) => {
  // TODO 볼륨 정도에 따른 Lottie Animation 처리 필요
  return (
    <Button
      animationDatas={[muteAniData, unmuteAniData]}
      onClick={onClick}
      name="mute-button"
    />
  )
}

export default MuteButton
