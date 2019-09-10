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
  /** 방송종료 예정시간 */
  endTime?: number;
  /** 상하단 컨트롤러 사용여부. false 인 경우 컨트롤러 비노출 */
  isControllable?: boolean;
  /** hover 상태 속성 */
  isHover?: boolean;
  /** 플레이어 영역 확장 상태 */
  isMaximized?: boolean;
  /** hover 이벤트를 플레이어 외부에서 제어할 수 있는 속성 */
  isUseHover?: boolean;
  /** 비디오 URL */
  url: string;
  /** 비디오 넓이 */
  width?: string;
  /** 비디오 최대 넓이 -> maximize 기능용 */
  maxWidth?: string;
  /** 비디오 높이 */
  height?: string;
  /** 비디오 최대 높이 -> maximize 기능용 */
  maxHeight?: string;
  /** 비디오 fragment 변경 이벤트 핸들러 */
  onFragChange?: VideoProps['onFragChange'];
  /** fragment의 metadata 변경 이벤트 핸들러 */
  onFragParsingMetaData?: VideoProps['onFragParsingMetaData'];
  /** 비디오 컨테이너 사이즈 변경 이벤트 핸들러 */
  onToggleVideoSize?: (isMaximized?: boolean) => void;
  /** 화면에 표시되는 시청자 수 */
  viewCount?: number | string;
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
  viewCount,
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
          <StyledTopControls
            className={classnames({ active: true })}
            viewCount={viewCount}
          />
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

export { isSupported } from 'hls.js'
