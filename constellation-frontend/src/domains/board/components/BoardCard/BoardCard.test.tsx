import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { Card } from 'domains/board/models/Card'
import React from 'react'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { fireEvent, render, screen, within } from 'utils/testUtils'
import BoardCard, { BoardCardProps } from './BoardCard'

function renderComponent(props: BoardCardProps) {
    render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="1_list" type="QUOTE" ignoreContainerClipping={false}>
                {(dropProvided: DroppableProvided) => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        <BoardCard {...props} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

test('When BoardCard renders should show card description', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
    }

    renderComponent({ card })

    expect(screen.getByText('description')).toBeInTheDocument()
})

test('Given card without a label When BoardCard renders should does not show card label', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
    }

    renderComponent({ card })

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
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })

    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})

test('When user clicks on editIcon should show the editModal with correct values', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })

    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    const dialog = screen.getByRole('dialog')
    const descriptionTextarea = within(dialog).getByPlaceholderText(
        'Enter a description for this card…'
    ) as HTMLTextAreaElement

    expect(descriptionTextarea.value).toBe(card.description)
    expect(within(dialog).getByText('Low Criticity')).toBeInTheDocument()
    expect(within(dialog).getByTitle('Low Criticity')).toBeInTheDocument()
})

test('When user clicks on save button should hide modal', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test(`Given user is delleting a card When user clicks on continue 
    button inside confirmation modal should close modal`, () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('When user clicks outside of modal should hide modal', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    fireEvent.click(screen.getByTestId('dialog-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('When user press Esc should hide modal', () => {
    const card: Card = {
        id: 1,
        index: 1,
        description: 'description',
        label: CriticityLevel.LOW,
    }

    renderComponent({ card })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    fireEvent.keyDown(document, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
