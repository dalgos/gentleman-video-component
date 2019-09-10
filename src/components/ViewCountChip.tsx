import React, { FC } from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'

// import LottieLoader from '../LottieLoader'
import viewEye from '../assets/json/ic_views_w_16@2x.json'
import Chip, { ChipIcon } from 'components/Chip'

interface Props {
  className?: string;
  /** 시청자 수 */
  count: number | string;
}

/** Icon Container */
const Icon = styled.div`
  float: left;
  width: 16px;
  height: 16px;
  margin-left: -20px;
`

const lottieOptions = {
  animationData: viewEye,
}

const EyeIcon = () => (
  <ChipIcon>
    <Lottie
      options={lottieOptions}
    />
  </ChipIcon>
)

/**
 * 시청자 수 표시 Chip
 * @param {object} param
 */
const ViewCountChip: FC<Props> = ({ className, count }) => {
  return (
    <Chip
      className={className}
      icon={EyeIcon}
      content={count}
    />
  )
}

export default styled(ViewCountChip)`
  min-width: 66px;
  max-width: 92px;
  line-height: 16px;
  font-size: 12px;
  font-weight: bold;
  float: left;
  margin-left: 4px;
  z-index: 100;
`
