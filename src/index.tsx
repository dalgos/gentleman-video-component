import * as React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { PlayerProvider } from './context'
import Wrapper from './elements/Wrapper'
import Video from './containers/Video'
import TopControls from './containers/TopControls'
import BottomControls from './containers/BottomControls'

interface Props {
  className?: string;
  isControllable?: boolean;
  isMaximized?: boolean;
  uri: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  videoHeight?: string;
  videoWidth?: string;
  onToggleVideoSize?: (isMaximized?: boolean) => void;
}

const { useEffect, useState } = React

const StyledTopControls = styled(TopControls)`
  opacity: 0;
  transition: opacity .6s cubic-bezier(0.4,0.0,1,1);
  &.active {
    opacity: 1;
  }
`

const StyledBottomControls = styled(BottomControls)`
  opacity: 0;
  transition: opacity .6s cubic-bezier(0.4,0.0,1,1);
  &.active {
    opacity: 1;
  }
`

const App: React.FunctionComponent<Props> = ({
  className,
  isControllable = true,
  isMaximized = false,
  height,
  maxHeight,
  width,
  maxWidth,
  onToggleVideoSize = () => {},
}) => {

  const { 0: isHover, 1: handleHover } = useState(true)

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => handleHover(true)
  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => handleHover(true)

  useEffect(() => {
    isControllable && setTimeout(() => handleHover(false), 1000)
  }, [handleHover, isControllable])

  return (
    <PlayerProvider
      initialState={{
        isMuted: true,
        isVideoMaximized: isMaximized,
        onToggleVideoSize,
        volume: 0,
      }}
    >
      <Wrapper
        className={className}
        {...isControllable && {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }}
      >
        {isControllable &&
          <StyledTopControls className={classnames({ active: isHover })} />
        }
        <Video
          width={width}
          maxWidth={maxWidth}
          height={height}
          maxHeight={maxHeight}
        />
        {isControllable &&
          <StyledBottomControls className={classnames({ active: isHover })} />
        }
      </Wrapper>
    </PlayerProvider>
  )
}

export default App
