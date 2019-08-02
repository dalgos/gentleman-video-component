import * as React from 'react'
import styled from 'styled-components'

import { usePlayerStateValue } from '../context'
import maximizeAnimationData from '../assets/json/ic_maximise_w_24.json'
import minimizeAnimationData from '../assets/json/ic_minimize_w_24.json'
import LottieButton from '../components/LottieButton'

interface Props {}

const StyledLottieButton = styled(LottieButton)`
  margin: 20px;
  box-sizing: border-box;
  padding: 0;
  width: 24px;
  height: 24px;
`

const MaximizeButton: React.FunctionComponent<Props> = () => {
  const [{ isVideoMaximized, onToggleVideoSize }, dispatch] = usePlayerStateValue()

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch({ type: isVideoMaximized ? 'MINIMIZED_VIDEO' : 'MAXIMIZED_VIDEO' })
    onToggleVideoSize(!isVideoMaximized)
  }, [isVideoMaximized, onToggleVideoSize])

  return (
    <StyledLottieButton
      onClick={handleClick}
      playAniData={minimizeAnimationData}
      reverseAniData={maximizeAnimationData}
      isPlayed={isVideoMaximized}
      width={24}
      height={24}
      options={{
        animationData: minimizeAnimationData,
        autoplay: false,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      isStopped={true}
      isClickToPauseDisabled={true}
    />
  )
}

export default MaximizeButton
