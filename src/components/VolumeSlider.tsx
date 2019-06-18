import * as React from 'react'
import styled from 'styled-components'

interface Props {
  className?: string;
  onVolumeChange?: (volume: number) => void;
  value: number;
}

const Wrapper = styled.div`
  display: block;
  position: relative;
  height: 100%;
  cursor: pointer;
  > .progress-lower {
    position: absolute;
    top: 50%;
    height: 2px;
    transform: translateY(-1px);
    width: 0%;
    background: #ffffff;
  }
  ._volume-slider {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    touch-action: none;
  }
  ._slider-handle {
    position: absolute;
    background-color: #ffffff;
    left: ${({ dragX }: { dragX: number }) => dragX || 0}px;
    top: 50%;
    margin-top: -6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    &:before {
      content: '';
      width: 100%;
      position: absolute;
      left: -50px;
      top: 50%;
      height: 2px;
      width: 56px;
      background: rgba(255, 255, 255, 1);
      margin-top: -1px;
    }
    &:after {
      content: '';
      width: 100%;
      position: absolute;
      left: 6px;
      top: 50%;
      height: 2px;
      width: 56px;
      background: rgba(255, 255, 255, .2);
      margin-top: -1px;
    }
  }
`

const getVolume = (x: number, base = 287, min = 0, max = 44) => Math.max(Math.min(x - base, max), min)

const VolumeRange: React.FunctionComponent<Props> = ({
  className,
  onVolumeChange,
  value = 0,
}) => {
  const { 0: volume, 1: updateVolume } = React.useState(value)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault()
    return false
  }
  // 마우스 이벤트 바인딩
  const handleMouseDown = () => {
    document.body.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseup', clearMouseEvent)
    document.body.addEventListener('mouseleave', clearMouseEvent)
  }
  // 마우스 이벤트 클리어
  const clearMouseEvent = () => {
    document.body.removeEventListener('mousemove', handleMouseMove)
    document.body.removeEventListener('mouseup', clearMouseEvent)
    document.body.removeEventListener('mouseleave', clearMouseEvent)
  }

  React.useEffect(() => {
    onVolumeChange && onVolumeChange(Math.floor(volume * (100 / 44)))
  }, [volume])

  const handleMouseMove = (evt: MouseEvent) => {
    if (sliderRef && sliderRef.current) {
      const domRect = sliderRef.current.getBoundingClientRect() as DOMRect
      const volume = getVolume(evt.clientX, domRect.x, 0, domRect.width - 12)
      updateVolume(volume)
    }
  }

  return (
    <Wrapper className={className} role="slider" dragX={volume}>
      <div className="_volume-slider" ref={sliderRef} draggable={true} onDragStart={handleDrag} onMouseDown={handleMouseDown}>
        <div className="_slider-handle" />
      </div>
    </Wrapper>
  )
}

export default VolumeRange
