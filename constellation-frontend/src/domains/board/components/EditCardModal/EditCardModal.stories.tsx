import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import EditCardModal, { EditCardModalProps } from './EditCardModal'

export default {
    title: 'Components/Board/EditCardModal',
    component: EditCardModal,
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
