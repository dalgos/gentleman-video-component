import * as React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string;
  displayTime: string;

}

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

export default ({ className, displayTime = '00:00:00' }: Props) => {
  return (
    <Wrapper className={className}>
      <div>
        <span>{displayTime}</span>
      </div>
    </Wrapper>
  )
}
