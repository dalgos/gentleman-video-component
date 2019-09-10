import React, { FC, ComponentType, FunctionComponent, ComponentClass } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  className?: string;
  icon?: FunctionComponent | ComponentClass;
  content?: ComponentType | string | number;
}

export const ChipIcon = styled.div`
  height: 16px;
  width: 16px;
`

/**
 * Chip Component
 * @param param
 */
const Chip: FC<Props> = ({
  content,
  className,
  icon: Icon,
}) => {
  return (
    <div className={className}>
      {Icon && <Icon />}
      <span className="chip-content">
        {content}
      </span>
    </div>
  )
}

/**
 * 아이콘 컴포넌트가 있는 경우 추가 CSS
 */
const withIconCSS = css`
  padding-left: 28px;
  > div {
    float: left;
    margin-left: -1rem;
  }
  .chip-content {
    padding-left: 0.25rem;
  }
`

export default styled(Chip)<Props>`
  height: 1.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  box-sizing: border-box;
  ${({ icon }) => icon && withIconCSS}
`
