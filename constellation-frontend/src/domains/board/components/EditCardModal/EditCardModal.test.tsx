import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import React from 'react'
import { fireEvent, render, screen } from 'utils/testUtils'
import EditCardModal, { EditCardModalProps } from './EditCardModal'

function setup() {
    const onSaveSpy = jest.fn()
    const onDeleteSpy = jest.fn()
    const onCloseSpy = jest.fn()

    const modalProps: EditCardModalProps = {
        card: {
            id: 1,
            index: 1,
            description: 'description',
            label: CriticityLevel.LOW,
            listId: 1,
        },
        onSave: onSaveSpy,
        onDelete: onDeleteSpy,
        onClose: onCloseSpy,
    }

    return { modalProps, onSaveSpy, onDeleteSpy, onCloseSpy }
}

test('When EditCardModal renders should show the card description', () => {
    const { modalProps } = setup()

    render(<EditCardModal {...modalProps} />)

    const descriptionTextarea = screen.getByPlaceholderText(
        'Enter a description for this card…'
    ) as HTMLTextAreaElement

    expect(descriptionTextarea.value).toBe(modalProps.card.description)
})

test('When EditCardModal renders should show the label', () => {
    const { modalProps } = setup()

    render(<EditCardModal {...modalProps} />)

    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
})

test('When user clicks on save button should call onSave callback', () => {
    const { modalProps, onSaveSpy } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSaveSpy).toBeCalledTimes(1)
})

test('When user clicks on delete button should show the confirmation modal', () => {
    const { modalProps } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getByText('Delete Card')).toBeInTheDocument()
    expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('When user clicks on continue button inside the confirmation modal should call onDelete callback', () => {
    const { modalProps, onDeleteSpy } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(onDeleteSpy).toBeCalledTimes(1)
})

test('When user clicks on close button inside the confirmation modal should hide the modal', () => {
    const { modalProps } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByText('Delete Card')).not.toBeInTheDocument()
    expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
})

test('When user clicks outside of modal should call onClose callback', () => {
    const { modalProps, onCloseSpy } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.click(screen.getByTestId('dialog-backdrop'))

    expect(onCloseSpy).toBeCalledTimes(1)
})

test('When user press Esc should call onClose callback', () => {
    const { modalProps, onCloseSpy } = setup()

    render(<EditCardModal {...modalProps} />)

    fireEvent.keyDown(document, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
    })

    expect(onCloseSpy).toBeCalledTimes(1)
})
