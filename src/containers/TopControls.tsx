import * as React from 'react'
import styled from 'styled-components'

import { usePlayerStateValue } from '../context'
import MaximizeButton from './MaximizeButton'
import TimeDisplay from '../components/TimeDisplay'

interface Props {
  className?: string;
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 96px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
`

const StyledTimeDisplay = styled(TimeDisplay)`
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
`

const TopControls: React.FunctionComponent<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <MaximizeButton />
      <StyledTimeDisplay displayTime="59:59:59" />
    </Wrapper>
  )
}

export default TopControls
