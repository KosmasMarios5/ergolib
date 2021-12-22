import React from 'react'
import Button from './button'
import { render } from '@testing-library/react'

describe('Button', () => {
  test('renders the Button component', () => {
    render(<Button>Hello world!</Button>)
  })
})
