import React from 'react'
import { fireEvent, render, screen } from 'utils/testUtils'
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal'

function setup() {
    const onContinueSpy = jest.fn()
    const onCloseSpy = jest.fn()

    const props: ConfirmationModalProps = {
        title: 'title',
        description: 'description',
        continueButtonText: 'Continue',
        closeButtonText: 'Close',
        onContinue: onContinueSpy,
        onClose: onCloseSpy,
    }

    return { props, onContinueSpy, onCloseSpy }
}

test('When ConfirmationModal renders should show the correct data', () => {
    const { props } = setup()

    render(<ConfirmationModal {...props} />)

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('When user click on continue button should call onContinueSpy', () => {
    const { props, onContinueSpy } = setup()

    render(<ConfirmationModal {...props} />)

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(onContinueSpy).toBeCalledTimes(1)
})

test('When user click on close button should call onCloseSpy', () => {
    const { props, onCloseSpy } = setup()

    render(<ConfirmationModal {...props} />)

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(onCloseSpy).toBeCalledTimes(1)
})

test('When user clicks outside of modal should call onClose callback', () => {
    const { props, onCloseSpy } = setup()

    render(<ConfirmationModal {...props} />)

    fireEvent.click(screen.getByTestId('dialog-backdrop'))

    expect(onCloseSpy).toBeCalledTimes(1)
})

test('When user press Esc should call onClose callback', () => {
    const { props, onCloseSpy } = setup()

    render(<ConfirmationModal {...props} />)

    fireEvent.keyDown(document, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
    })

    expect(onCloseSpy).toBeCalledTimes(1)
})
