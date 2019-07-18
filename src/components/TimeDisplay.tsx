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
  height: 24px;
  line-height: 0;
  .time__text {
    font-size: 0.75rem;
    line-height: 1.167;
    color: #ffffff;
    margin-top: 12px;
    transform: translateY(-51.4%);
    display: inline-block;
  }
`

export default memo(({ className, remainTime: remainTimeProp }: Props) => {
  const { 0: remainTime, 1: updateRemainTime } = useState(remainTimeProp)
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainTime((prev) => Math.max(prev - 1000, 0))
    }, 1000)
    return () => {
      interval && clearInterval(interval)
    }
  }, [])
  return (
    <Wrapper className={`time ${className}`}>
      <div className="time__text">
        {getDateFromUTC(remainTime).getString()}
      </div>
    </Wrapper>
  )
})
