import React from 'react'
import { render } from '@testing-library/react'

import Chip from './Chip'

test('render default', () => {
  const { container } = render(<Chip content="Default" />)

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="sc-bwzfXH iiDdYV"
      >
        <span
          class="chip-content"
        >
          Default
        </span>
      </div>
    </div>
  `)
})
