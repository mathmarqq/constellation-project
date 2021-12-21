import React from 'react'
import { render, screen } from 'utils/testUtils'
import Card from './Card'

test('When Card renders should show his children', () => {
    render(<Card>Test</Card>)

    expect(screen.getByText('Test')).toBeInTheDocument()
})
