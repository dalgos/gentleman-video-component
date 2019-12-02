import React from 'react'
import styled from 'styled-components'

import { usePlayerStateValue } from '../context'
import onAnimationData from '../assets/json/ic_minimize_w_24.json'
import offAnimationData from '../assets/json/ic_maximise_w_24.json'
import LottieToggleButton from 'modules/lottie-button'

const StyledLottieButton = styled(LottieToggleButton)`
  margin: 20px;
  box-sizing: border-box;
  padding: 0;
  width: 24px;
  height: 24px;
  background: none;
  outline: none;
  border: 0;
`

const MaximizeButton: React.FunctionComponent = () => {
  const [{ isVideoMaximized, onToggleVideoSize }, dispatch] = usePlayerStateValue()

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch({ type: isVideoMaximized ? 'MINIMIZED_VIDEO' : 'MAXIMIZED_VIDEO' })
    onToggleVideoSize(!isVideoMaximized)
  }, [isVideoMaximized, onToggleVideoSize])

  return (
    <StyledLottieButton
      name="maximize-button"
      animationDatas={[onAnimationData, offAnimationData]}
      onClick={handleClick}
    />
  )
}

export default MaximizeButton
