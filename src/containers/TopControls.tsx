import * as React from 'react'
import styled, { css } from 'styled-components'
import { getHours, getMinutes, getSeconds } from 'date-fns'
import { CSSTransition } from 'react-transition-group'

import { usePlayerStateValue } from '../context'
import MaximizeButton from './MaximizeButton'
import TimeDisplay from '../components/TimeDisplay'
import ViewCountChip from '../components/ViewCountChip'

interface Props {
  className?: string;
  viewCount?: number | string;
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

const Chips = styled.div`
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
  > div {
    float: left;
  }
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const ViewCountWithTransit = styled(ViewCountChip)`
  transition: opacity 300ms ease-in-out, margin 300ms ease-in-out, transform 300ms ease-in-out;
  &.enter {
    opacity: 0;
    margin-left: -66px;
    transform: scale(.5);
  }
  &.enter-active, &.exit {
    opacity: 1;
    margin-left: 4px;
    transform: scale(1);
  }
  &.exit-active {
    opacity: 0;
    margin-left: -66px;
    transform: scale(.5);
  }
`

const TopControls: React.FunctionComponent<Props> = ({ className, viewCount }) => {
  const { 0: { endTime } } = usePlayerStateValue()
  const remainTime = endTime - (new Date()).getTime()
  const { 0: displayTime, 1: updateDisplayTime } = useState('00:00:00')

  useEffect(() => {
    updateDisplayTime(`${getHours(remainTime)}:${getMinutes(remainTime)}:${getSeconds(remainTime)}`)
  }, [endTime, remainTime])

  return (
    <Wrapper className={className}>
      <MaximizeButton />
      <Chips>
        <TimeDisplay
          displayTime={displayTime}
          remainTime={remainTime}
        />
        <CSSTransition
          in={!!viewCount}
          timeout={300}
          unmountOnExit={true}
        >
          <ViewCountWithTransit
            count={viewCount || 0}
          />
        </CSSTransition>
      </Chips>
    </Wrapper>
  )
}

export default TopControls
