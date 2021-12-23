import { act, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import { createList } from 'infra'
import AddList from './AddList'

jest.mock('infra')

test('When user clicks on add list should show a input and action buttons', () => {
    render(<AddList listIndex={1} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add another list' }))

    expect(screen.getByPlaceholderText('Enter list title...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save list' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel Form' })).toBeInTheDocument()
    expect(screen.getByText('Cancel Form')).toBeInTheDocument()
})

test('When user clicks on cancel form should hide the textarea and action buttons', () => {
    render(<AddList listIndex={1} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add another list' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Form' }))

    expect(screen.queryByPlaceholderText('Enter list title...')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save list' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})

test('When user clicks on save card should hide the textarea and action buttons', async () => {
    const mockedCreateList = createList as jest.Mock
    mockedCreateList.mockResolvedValue(null)

    render(<AddList listIndex={1} />)
    fireEvent.click(screen.getByRole('button', { name: 'Add another list' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Save list' }))
    })

    await waitFor(() => {
        expect(screen.queryByPlaceholderText('Enter list title...')).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Save list' })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
        expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
    })
})
