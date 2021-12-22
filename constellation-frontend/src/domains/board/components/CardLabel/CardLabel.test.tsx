import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import CardLabel from './CardLabel'

test('Given card without a label When CardLabel renders should does not show card description', () => {
    render(<CardLabel />)

    expect(screen.queryByText('Low Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Low Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('Medium Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Medium Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('High Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('High Criticity')).not.toBeInTheDocument()
})

test.each([
    [CriticityLevel.LOW, 'Low Criticity'],
    [CriticityLevel.MEDIUM, 'Medium Criticity'],
    [CriticityLevel.HIGH, 'High Criticity'],
])(
    'Given card with a label When CardLabel renders should have label description',
    (criticityLevel, labelDescription) => {
        render(<CardLabel label={criticityLevel} />)

        expect(screen.getByTitle(labelDescription)).toBeInTheDocument()
        expect(screen.getByText(labelDescription)).toBeInTheDocument()
    }
)
