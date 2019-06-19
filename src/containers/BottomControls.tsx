import * as React from 'react'
import styled from 'styled-components'

import MuteButton from '../components/MuteButton'
import VolumeRange from '../components/VolumeSlider'
import { usePlayerStateValue, updateVolumeAction, muteVolumeAction } from '../context'

interface Props {
  className?: string;
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 3rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .2));
  height: 48px;
  line-height: 1;
  vertical-align: top;
  border-radius: 0 0 8px 8px;
`

const ControlWrapper = styled.span`
  float: left;
  height: 100%;
`

const StyledMuteButton = styled(MuteButton)`
  float: left;
`

const StyledVolumeRange = styled(VolumeRange)`
  float: left;
  width: 56px;
`

const BottomControls: React.FunctionComponent<Props> = ({ className }) => {
  const { 0: { volume, isMuted }, 1: dispatch } = usePlayerStateValue()
  const handleVolumeChange = (value: number) => dispatch(updateVolumeAction(value))
  const handleSpeakerClick = () => dispatch(muteVolumeAction())

  return (
    <Wrapper className={className}>
      <ControlWrapper>
        <StyledMuteButton
          isMuted={isMuted}
          onClick={handleSpeakerClick}
          volume={volume}
        />
        <StyledVolumeRange
          onVolumeChange={handleVolumeChange}
          value={volume}
          isMuted={isMuted}
        />
      </ControlWrapper>
    </Wrapper>
  )
}

export default React.memo(BottomControls)
