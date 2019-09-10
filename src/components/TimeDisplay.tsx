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
  height: 28px;
  min-width: 70px;
  padding: 5px 12px;
  display: inline-block;
  text-align: center;
  border-radius: .25rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.75rem;
  display: table;
  .time__text {
    color: #ffffff;
    display: table-cell;
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
