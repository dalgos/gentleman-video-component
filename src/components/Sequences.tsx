import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  imgSrc: string;
  frames: number;
  width: number;
  height: number;
  isPlay: boolean;
  onComplete?: () => void;
}

const Container = styled.div<{ imgSrc: string; py: number; width: number; height: number; }>`
  display: inline-block;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-position-y: ${({ py }) => py}px;
  background-size: ${({ width }) => width}px auto;
  background-repeat: no-repeat;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`

const Sequences: FC<Props> = ({
  frames,
  imgSrc,
  width,
  height,
  isPlay,
  onComplete,
}) => {
  const { 0: seq, 1: setSeq } = useState(0)

  useEffect(() => {
    const timer = isPlay ? setInterval(() => {
      setSeq((prevSeq) => {
        if (prevSeq === frames - 1) {
          clearInterval(timer)
          onComplete && onComplete()
          return 0
        }
        return prevSeq < frames - 1 ? prevSeq + 1 : frames - 1
      })
    }, 1000 / 30) : 0
    return () => clearInterval(timer)
  }, [isPlay, imgSrc])

  return (
    <Container
      py={seq * height * -1}
      imgSrc={imgSrc}
      width={width}
      height={height}
    />
  )
}

export default Sequences
