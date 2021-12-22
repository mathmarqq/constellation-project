import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { Card } from 'domains/board/models/Card'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import BoardCard from './BoardCard'

test('When BoardCard renders should show card description', () => {
    const card: Card = {
        id: 1,
        description: 'description',
    }

    render(<BoardCard card={card} />)

    expect(screen.getByText('description')).toBeInTheDocument()
})

test('Given card without a label When BoardCard renders should does not show card description', () => {
    const card: Card = {
        id: 1,
        description: 'description',
    }

    render(<BoardCard card={card} />)

    expect(screen.queryByText('Low Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Low Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('Medium Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Medium Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('High Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('High Criticity')).not.toBeInTheDocument()
})

test('Given card with a label When BoardCard renders should have label description', () => {
    const card: Card = {
        id: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    render(<BoardCard card={card} />)

    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})
