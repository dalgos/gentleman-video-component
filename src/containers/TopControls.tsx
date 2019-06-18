import * as React from 'react'
import styled from 'styled-components'
import { getHours, getMinutes, getSeconds } from 'date-fns'

import { usePlayerStateValue } from '../context'
import MaximizeButton from './MaximizeButton'
import TimeDisplay from '../components/TimeDisplay'

interface Props {
  className?: string;
}

const { useEffect, useState } = React

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
  const { 0: { endTime } } = usePlayerStateValue()
  const { 0: remainTime, 1: updateRemainTime } = useState(endTime - (new Date()).getTime())
  const { 0: displayTime, 1: updateDisplayTime } = useState('00:00:00')
  useEffect(() => {
    updateDisplayTime(`${getHours(remainTime)}:${getMinutes(remainTime)}:${getSeconds(remainTime)}`)
  }, [endTime, remainTime])

  useEffect(() => {
    // setInterval(() => updateRemainTime((prev) => prev - 1000), 1000)
  }, [])
  return (
    <Wrapper className={className}>
      <MaximizeButton />
      <StyledTimeDisplay displayTime={displayTime} remainTime={remainTime} />
    </Wrapper>
  )
}

export default TopControls
