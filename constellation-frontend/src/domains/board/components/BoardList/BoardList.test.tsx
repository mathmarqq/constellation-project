import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { List } from 'domains/board/models/List'
import React from 'react'
import { fireEvent, render, screen } from 'utils/testUtils'
import BoardList from './BoardList'

test('When BoardList renders should show list title', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    expect(screen.getByText('Title')).toBeInTheDocument()
})

test('Given a list does not have a card When BoardList renders should does not show a card', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    expect(screen.queryByTestId('card')).not.toBeInTheDocument()
})

test('Given a list has a card When BoardList renders should show a card with correct values', () => {
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

test('Given a list has more than one card When BoardList renders should show all cards', () => {
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

test('When user clicks in add cart should show a textarea and action buttons', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))

    expect(screen.getByPlaceholderText('Enter a description for this card…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save card' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel Form' })).toBeInTheDocument()
    expect(screen.getByText('Cancel Form')).toBeInTheDocument()
})

test('When user clicks in cancel form should hide the textarea and action buttons', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Form' }))

    expect(
        screen.queryByPlaceholderText('Enter a description for this card…')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})

test('When user clicks in save card should hide the textarea and action buttons', () => {
    const list: List = {
        id: 1,
        title: 'Title',
        cards: [],
    }

    render(<BoardList list={list} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save card' }))

    expect(
        screen.queryByPlaceholderText('Enter a description for this card…')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})
