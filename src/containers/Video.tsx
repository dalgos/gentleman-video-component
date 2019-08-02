import * as React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { usePlayerStateValue } from '../context'
import HLSVideo, { Props as HLSVideoProps } from '../components/HLSVideo'

export interface Props {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  isMaximized?: boolean;
  onFragChange?: HLSVideoProps['onFragChange'];
  onFragParsingMetaData?: HLSVideoProps['onFragParsingMetaData'];
}

interface StyledVideoProps {
  width: string;
  height: string;
  maxWidth: string;
  maxHeight: string;
}

const StyledVideo = styled(HLSVideo)`
  display: block;
  transition: width .3s ease-in-out, height .3s ease-in-out, margin .3s ease-in-out;
  border-radius: 8px;
  ${({ width, maxWidth }: StyledVideoProps) => {
    return `
      width: ${width};
      margin-top: -50%;
      &.extended {
        width: ${maxWidth};
        margin-top: 0;
      }
    `
  }}
  background-color: #E6E6E6;
`

const Video: React.FunctionComponent<Props> = ({
  maxHeight = '740px',
  maxWidth = '416px',
  width = '416px',
  height = '416px',
  onFragChange,
  onFragParsingMetaData,
}) => {
  const [{ isMuted, isVideoMaximized, url, volume }] = usePlayerStateValue()

  return (
    <StyledVideo
      id="mediaPlayer"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      width={width}
      height={height}
      className={classnames({ extended: isVideoMaximized })}
      url={url}
      isMute={isMuted}
      onFragChange={onFragChange}
      onFragParsingMetaData={onFragParsingMetaData}
      volume={volume}
    />
  )
}

export default React.memo(Video)
