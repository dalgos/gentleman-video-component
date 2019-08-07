import React, { FC, useEffect, useRef, useState } from 'react'
import lottie, { AnimationConfigWithData } from 'lottie-web'

interface OutterProps {
  animationData: AnimationConfigWithData['animationData'];
  className?: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LottieToggleButton: FC<OutterProps> = ({
  animationData,
  className,
  name,
  onClick,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { 0: isToggled, 1: setToggle } = useState(false)

  useEffect(() => {
    lottie.destroy(name)
    if (btnRef && btnRef.current) {
      lottie.loadAnimation({
        animationData,
        autoplay: false,
        container: btnRef.current,
        loop: false,
        name,
        renderer: 'svg',
      })
    }
  }, [btnRef, name])

  const clickHanlder: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    lottie.setDirection(isToggled ? -1 : 1, name)
    lottie.play(name)
    setToggle((toggle) => !toggle)
    onClick && onClick(evt)
  }

  return (
    <button
      className={className}
      type="button"
      onClick={clickHanlder}
      ref={btnRef}
    />
  )
}

export default LottieToggleButton
