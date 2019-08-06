import React, { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Lottie, { Options as LottieOptions } from 'react-lottie'
import classnames from 'classnames'

import volumeOnAniData from 'assets/json/ic_volume_on_w_24.json'
import volumeOffAniData from 'assets/json/ic_volume_off_w_24.json'

interface Props {
  isMuted: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  volume: number;
}

const Button = styled.button<Props>`
  div.ico-speaker {
    width: 100%;
    height: 100%;
  }
  /* &.bg-on {
    div.ico-speaker {
      background-image: url(//cdnmediaimage.tmon.co.kr/static/img/livePc/ic_volume_24.png);
      background-size: 24px 96px;
      background-repeat: no-repeat;
      background-position-y: ${({
        volume,
        isMuted,
      }: Props) => {
        if (isMuted) {
          return -72
        } else {
          if (volume === 0) {
            return -72
          } else if (0 < volume && volume < 0.5) {
            return -48
          } else if (0.5 <= volume && volume < 1) {
            return -24
          } else if (volume === 1) {
            return 0
          }
        }
      }}px;
    }
  } */
  width: 48px;
  height: 48px;
  display: block;
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  margin: 8px;
  box-sizing: border-box;
  padding: 12px;
  float: left;
`

const MuteButton: FC<Props> = ({
  isMuted,
  onClick,
  volume,
}) => {

  const { 0: { lottieOptions }, 1: setState } = useState<{
    lottieOptions: LottieOptions;
  }>({
    lottieOptions: {
      animationData: volumeOffAniData,
      autoplay: true,
      loop: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    },
  })

  useEffect(() => {
    setState((prevState) => ({
      aniVisible: true,
      lottieOptions: {
        ...prevState.lottieOptions,
        animationData: (isMuted || volume === 0) ? volumeOffAniData : volumeOnAniData,
        autoPlay: true,
      }
    }))
  }, [isMuted, volume])

  // TODO: 음소거 활성/비활성 Lottie 애니메이션 처리 필요
  return (
    <Button
      className="bg-on"
      isMuted={isMuted}
      onClick={onClick}
      volume={volume}
    >
      <Lottie
        isClickToPauseDisabled={true}
        options={lottieOptions}
        isStopped={false}
      />
    </Button>
  )
}

export default MuteButton
