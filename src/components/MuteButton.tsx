import React, { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Lottie, { Options as LottieOptions } from 'react-lottie'
import classnames from 'classnames'

import volumeOnAniData from 'assets/json/ic_volume_on_w_24.json'
import volumeOffAniData from 'assets/json/ic_volume_off_w_24.json'
import Sequences from 'components/Sequences'

interface Props {
  isMuted: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  volume: number;
}

const Icon = styled.div<Props>`
  width: 24px;
  height: 24px;
  background-image: url(//cdnmediaimage.tmon.co.kr/static/img/livePc/ic_volume_24_v2.svg);
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
`

const Button = styled.button`
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

const imgSrcs = [
  { imgSrc: '//cdnmediaimage.tmon.co.kr/static/img/livePc/ic_volume_on@2x.png', frames: 30 },
  { imgSrc: '//cdnmediaimage.tmon.co.kr/static/img/livePc/ic_volume_off@2x.png', frames: 25 },
]

const MuteButton: FC<Props> = ({
  isMuted,
  onClick,
  volume,
}) => {

  const { 0: config, 1: setConfig } = useState({
    imgSrcIndex: 0,
    isMuted: true,
    isPlay: false,
    volume,
  })

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    !isMuted && volume === 0 || onClick && onClick(evt)
  }

  const completeHandler = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      imgSrcIndex: prevConfig.imgSrcIndex === 0 ? 1 : 0,
      isPlay: false,
    }))
  }

  useEffect(() => {
    setConfig((prevConfig) => {
      // 애니메이션 플레이 기준 구분
      if (prevConfig.isMuted !== isMuted || prevConfig.volume === 0 && volume > 0 || prevConfig.volume > 0 && volume === 0) {
        return {
          ...prevConfig,
          imgSrcIndex: isMuted ? 1 : (volume === 0 ? 1 : 0),
          isMuted,
          isPlay: true,
          volume,
        }
      }
      return prevConfig
    })
  }, [isMuted, volume])

  // TODO: 음소거 활성/비활성 Lottie 애니메이션 처리 필요
  return (
    <Button
      onClick={clickHandler}
    >
      {/* <Icon
        isMuted={isMuted}
        volume={volume}
      /> */}
      <Sequences
        imgSrc={imgSrcs[config.imgSrcIndex].imgSrc}
        width={24}
        height={24}
        isPlay={config.isPlay}
        frames={imgSrcs[config.imgSrcIndex].frames}
        onComplete={completeHandler}
      />

      {/* <Lottie
        isClickToPauseDisabled={true}
        options={lottieOptions}
        isStopped={false}
      /> */}
    </Button>
  )
}

export default MuteButton
