import * as React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { PlayerProvider } from './context'
import Wrapper from './elements/Wrapper'
import Video, { Props as VideoProps } from './containers/Video'
import TopControls from './containers/TopControls'
import BottomControls from './containers/BottomControls'
import { debounce } from 'lodash'

export interface Props {
  className?: string;
  endTime?: number; // 방송종료 예정시간
  isControllable?: boolean; // 상하단 컨트롤러 사용여부. false 인 경우 컨트롤러 비노출
  isHover?: boolean;  // hover 상태 속성
  isMaximized?: boolean; // 플레이어 영역 확장 상태
  isUseHover?: boolean; // hover 이벤트를 플레이어 외부에서 제어할 수 있는 속성
  url: string; // 비디오 URL
  width?: string; // 비디오 넓이
  maxWidth?: string; // 비디오 최대 넓이 -> maximize 기능용
  height?: string; // 비디오 높이
  maxHeight?: string; // 비디오 최대 높이 -> maximize 기능용
  onFragChange?: VideoProps['onFragChange'];
  onFragParsingMetaData?: VideoProps['onFragParsingMetaData'];
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
  onFragChange,
  onFragParsingMetaData,
  onToggleVideoSize = () => {},
  url,
}) => {
  const { 0: isHover, 1: handleHover } = useState(isHoverProps)

  const handleMouseEnter = debounce(() => handleHover(true))
  const handleMouseLeave = debounce(() => handleHover(false), LEAVE_DELAY)

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
          <StyledTopControls className={classnames({ active: true })} />
        }
        <Video
          width={width}
          maxWidth={maxWidth}
          height={height}
          maxHeight={maxHeight}
          onFragChange={onFragChange}
          onFragParsingMetaData={onFragParsingMetaData}
        />
        {isControllable &&
          <StyledBottomControls className={classnames({ active: isHover })} />
        }
      </Wrapper>
    </PlayerProvider>
  )
}

export default App
