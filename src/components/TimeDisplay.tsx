import * as React from 'react'
import styled from 'styled-components'

import { getDateFromUTC } from '../utils'

interface Props {
  className?: string;
  displayTime: string;
  remainTime: number;
}

const { memo, useEffect, useState } = React

const Wrapper = styled.div`
  background-color: #F27935;
  height: 1.5rem;
  min-width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 1.5rem;
  border-radius: .25rem;
  line-height: 1;
  text-align: center;
  span {
    font-size: .8rem;
    line-height: 1;
    color: #ffffff;
    vertical-align: middle;
  }
`

export default memo(({ className, remainTime: remainTimeProp }: Props) => {
  const { 0: remainTime, 1: updateRemainTime } = useState(remainTimeProp)
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainTime((prev) => prev - 1000)
    }, 1000)
    return () => {
      interval && clearInterval(interval)
    }
  }, [])
  return (
    <Wrapper className={className}>
      <div>
        <span>{getDateFromUTC(remainTime).getString()}</span>
      </div>
    </Wrapper>
  )
})
