import * as React from 'react'
import styled, { ThemedStyledFunction } from 'styled-components'

interface Props {
  isMuted: boolean;
  volume: number;
}

const MuteButton = styled.button`
  background: url(//cdnmediaimage.tmon.co.kr/static/img/livePc/ic_volume_24.svg) no-repeat center center;
  background-size: 48px 144px;
  background-position-y: ${({
    volume,
    isMuted,
  }: Props) => {
    if (isMuted) {
      return '-96'
    } else {
      if (volume === 0) {
        return '-96'
      } else if (volume < 51) {
        return '-48'
      } else {
        return '0'
      }
    }
  }}px;
  width: 48px;
  height: 48px;
  display: block;
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
`
export default MuteButton
