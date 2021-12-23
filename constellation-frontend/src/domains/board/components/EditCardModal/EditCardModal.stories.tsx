import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import withMock from 'storybook-addon-mock'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import EditCardModal, { EditCardModalProps } from './EditCardModal'

export default {
    title: 'Components/Board/EditCardModal',
    component: EditCardModal,
    decorators: [withMock],
    parameters: {
        chromatic: { delay: 2000 },
    },
} as Meta

const Template: Story<EditCardModalProps> = (args: EditCardModalProps) => (
    <EditCardModal {...args} />
)

export const Main = Template.bind({})
Main.args = {
    card: {
        id: 1,
        index: 1,
        description: 'This is a Todo list with items that can be marked off',
        label: CriticityLevel.LOW,
        listId: 1,
    },
    style: { top: '58px', left: '24px' },
    onSave: () => {},
    onDelete: () => {},
    onClose: () => {},
}

Main.parameters = {
    mockData: [
        {
            url: 'http://localhost:3000/cards/1',
            method: 'PUT',
            status: 200,
        },
        {
            url: 'http://localhost:3000/cards/1',
            method: 'DELETE',
            status: 200,
        },
    ],
}
