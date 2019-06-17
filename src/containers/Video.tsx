import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'
import classnames from 'classnames'

import { usePlayerStateValue } from '../context'

export interface Props {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  isMaximized?: boolean;
}

interface StyledVideoProps {
  width: string;
  height: string;
  maxWidth: string;
  maxHeight: string;
}

const StyledVideo = styled.video`
  display: block;
  transition: width .3s ease-in-out, height .3s ease-in-out;
  border-radius: 8px;
  ${({ width, height, maxWidth, maxHeight }: StyledVideoProps) => {
    return `
      width: ${width};
      height: ${height};
      &.extended {
        width: ${maxWidth};
        height: ${maxHeight};
      }
    `
  }}
  background-color: #E6E6E6;
`

const Video: React.FunctionComponent<Props> = ({
  maxHeight = '740px',
  maxWidth = '416px',
  isMaximized = false,
  width = '416px',
  height = '416px',
}) => {
  const [{ isMuted, isVideoMaximized, volume }] = usePlayerStateValue()
  return (
    <StyledVideo
      id="mediaPlayer"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      width={width}
      height={height}
      className={classnames({ extended: isVideoMaximized })}
    />
  )
}

export default Video
