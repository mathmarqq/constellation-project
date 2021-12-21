import React from 'react'
import { render, screen } from '../../utils/testUtils'
import Button from './Button'

test('When button renders should show his children', () => {
    render(<Button>Test</Button>)

    expect(screen.getByText('Test')).toBeInTheDocument()
})
