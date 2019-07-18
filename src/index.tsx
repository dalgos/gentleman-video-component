import * as React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { PlayerProvider } from './context'
import Wrapper from './elements/Wrapper'
import Video from './containers/Video'
import TopControls from './containers/TopControls'
import BottomControls from './containers/BottomControls'
import { debounce } from 'lodash'

export interface Props {
  className?: string;
  endTime?: number;
  isControllable?: boolean;
  isHover?: boolean;
  isMaximized?: boolean;
  isUseHover?: boolean;
  url: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  videoHeight?: string;
  videoWidth?: string;
  onToggleVideoSize?: (isMaximized?: boolean) => void;
}

const { useEffect, useState } = React

// mouseleave 이벤트 발생 시 delay ms
const LEAVE_DELAY = 3000

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
  endTime = -1,
  isControllable = true,
  isHover: isHoverProps = true,
  isMaximized = false,
  isUseHover = true,
  height,
  maxHeight,
  width,
  maxWidth,
  onToggleVideoSize = () => {},
  url,
}) => {
  const { 0: isHover, 1: handleHover } = useState(isHoverProps)

  const handleMouseEnter = debounce(() => handleHover(true))
  const handleMouseLeave = debounce(() => {
    handleHover(false)
  }, LEAVE_DELAY)

  // * isHover 프로퍼티 변경 시 컨트롤러 영역 활성/비활성 처리
  useEffect(() => {
    handleHover(isHoverProps)
  }, [isHoverProps])

  // * 컨트롤러 영역이 노출 후 자동 hide 처리
  useEffect(() => {
    isControllable && isUseHover && handleMouseLeave()
  }, [])

  return (
    <PlayerProvider
      initialState={{
        endTime,
        isMuted: true,
        isVideoMaximized: isMaximized,
        onToggleVideoSize,
        url,
        volume: 0.5,
      }}
    >
      <Wrapper
        className={className}
        {...isControllable && isUseHover && {
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
