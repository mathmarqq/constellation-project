import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { List } from 'domains/board/models/List'
import React from 'react'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { act, fireEvent, render, screen, waitFor, within } from 'utils/testUtils'
import { createCard } from 'infra'
import BoardList, { BoardListProps } from './BoardList'

jest.mock('infra')

function renderComponent(props: BoardListProps) {
    render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="board" type="LIST" ignoreContainerClipping={false}>
                {(dropProvided: DroppableProvided) => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        <BoardList {...props} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

test('When BoardList renders should show list title', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })

    expect(screen.getByText('Title')).toBeInTheDocument()
})

test('Given a list does not have a card When BoardList renders should does not show a card', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })

    expect(screen.queryByTestId('card')).not.toBeInTheDocument()
})

test('Given a list has a card When BoardList renders should show a card with correct values', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                index: 1,
                description: 'description',
                label: CriticityLevel.LOW,
                listId: 1,
            },
        ],
    }

    renderComponent({ list })

    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})

test('Given a list has more than one card When BoardList renders should show all cards', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                index: 1,
                description: 'description',
                label: CriticityLevel.LOW,
                listId: 1,
            },
            {
                id: 2,
                index: 2,
                description: 'description 2',
                label: CriticityLevel.LOW,
                listId: 1,
            },
            {
                id: 3,
                index: 3,
                description: 'description 3',
                label: CriticityLevel.LOW,
                listId: 1,
            },
        ],
    }

    renderComponent({ list })

    expect(screen.getAllByTestId('card')).toHaveLength(3)
})

test('When user clicks on add cart should show a textarea and action buttons', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })

    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))

    expect(screen.getByPlaceholderText('Enter a description for this card…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save card' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel Form' })).toBeInTheDocument()
    expect(screen.getByText('Cancel Form')).toBeInTheDocument()
})

test('When user clicks on cancel form should hide the textarea and action buttons', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })

    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Form' }))

    expect(
        screen.queryByPlaceholderText('Enter a description for this card…')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})

test('When user clicks on save card should hide the textarea and action buttons', async () => {
    const mockedCreateCard = createCard as jest.Mock
    mockedCreateCard.mockResolvedValue(null)

    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })
    fireEvent.click(screen.getByRole('button', { name: 'Add a card' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Save card' }))
    })

    await waitFor(() => {
        expect(
            screen.queryByPlaceholderText('Enter a description for this card…')
        ).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
        expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
    })
})

test('When user clicks on trash icon should show the confirmation modal', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })

    fireEvent.click(screen.getByRole('button', { name: 'Delete List' }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Delete List')).toBeInTheDocument()
    expect(
        within(dialog).getByText('Do you really want to delete this record?')
    ).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Continue' })).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('When user clicks on close button inside the confirmation modal should hide the modal', () => {
    const list: List = {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ list })
    fireEvent.click(screen.getByRole('button', { name: 'Delete List' }))

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByText('Delete Card')).not.toBeInTheDocument()
    expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
})
