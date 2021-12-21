import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { List } from 'domains/board/models/List'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import BoardList from './BoardList'

test('When BoardCard renders should show list title', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    expect(screen.getByText('Title')).toBeInTheDocument()
})

test('Given a list does not have a card When BoardCard renders should does not show a card', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    expect(screen.queryByTestId('card')).not.toBeInTheDocument()
})

test('Given a list has a card When BoardCard renders should show a card with correct values', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                description: 'description',
                label: CriticityLevel.LOW,
            },
        ],
    }

    render(<BoardList list={list} />)

    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})

test('Given a list has more than one card When BoardCard renders should show all cards', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                description: 'description',
                label: CriticityLevel.LOW,
            },
            {
                id: 2,
                description: 'description 2',
                label: CriticityLevel.LOW,
            },
            {
                id: 3,
                description: 'description 3',
                label: CriticityLevel.LOW,
            },
        ],
    }

    render(<BoardList list={list} />)

    expect(screen.getAllByTestId('card')).toHaveLength(3)
})
