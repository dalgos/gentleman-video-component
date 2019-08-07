import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import lottie, { AnimationConfigWithData } from 'lottie-web'

type AnimationData = AnimationConfigWithData['animationData']

interface OutterProps {
  animationDatas: AnimationData[];
  className?: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LottieToggleButton: FC<OutterProps> = ({
  animationDatas,
  className,
  name,
  onClick,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { 0: isToggled, 1: setToggle } = useState(false)
  const { 0: onAnimationData, 1: offAnimationData } = animationDatas

  const getLottieConfig = useCallback<(animationData: AnimationData) => AnimationConfigWithData>((animationData) => ({
    animationData,
    autoplay: false,
    container: btnRef.current as Element,
    loop: false,
    name,
    renderer: 'canvas',
  }), [name])

  useEffect(() => {
    lottie.destroy(name)
    lottie.loadAnimation(getLottieConfig(onAnimationData))
  }, [name])

  const clickHanlder: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    lottie.destroy(name)
    lottie.loadAnimation(getLottieConfig(isToggled ? offAnimationData : onAnimationData))
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
