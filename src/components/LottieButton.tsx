import * as React from 'react'
import Lottie, { LottieProps } from 'react-lottie'
import styled from 'styled-components'

type AnimationDataType = LottieProps['options']['animationData']

interface Props extends LottieProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isPlayed: boolean;
  playAniData: AnimationDataType;
  reverseAniData: AnimationDataType;
}

type PlayType = 'PLAY' | 'REVERSE' | 'COMPLETE'
interface LottieAction {
  type: PlayType;
  animationData?: AnimationDataType;
}
type Reducer = React.Reducer<LottieProps, LottieAction>

const StyledButton = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
`

const reducer: Reducer = (state, { type, animationData }) => {
  switch (type) {
    case 'PLAY':
      return {
        ...state,
        isStopped: false,
        options: {
          ...state.options,
          animationData,
        },
      }
    case 'REVERSE':
      return {
        ...state,
        isStopped: false,
        options: {
          ...state.options,
          animationData,
        },
      }
    default:
      return state
  }
}

const LottieButton: React.FunctionComponent<Props> = ({
  className,
  onClick,
  playAniData,
  reverseAniData,
  isPlayed,
  ...lottieProps
}) => {
  const { 0: isReversed, 1: updateIsReversed } = React.useState<boolean>(isPlayed)

  const [ lottieState, dispatch] = React.useReducer(reducer, lottieProps)

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>((evt) => {
    evt.persist()
    dispatch({
      animationData: !isReversed ? playAniData : reverseAniData,
      type: !isReversed ? 'PLAY' : 'REVERSE',
    })
    updateIsReversed(!isReversed)
    onClick && onClick(evt)
  }, [isReversed, onClick, lottieState])

  React.useEffect(() => {
    updateIsReversed(isPlayed)
  }, [isPlayed])

  return (
    <StyledButton
      className={className}
      onClick={handleClick}
    >
      <Lottie
        {...lottieState}
      />
    </StyledButton>
  )
}

export default LottieButton
