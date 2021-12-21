import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import BoardList, { BoardListProps } from './BoardList'

export default {
    title: 'Components/Board/List',
    component: BoardList,
} as Meta

const Template: Story<BoardListProps> = (args: BoardListProps) => <BoardList {...args} />

export const Main = Template.bind({})
Main.args = {
    list: {
        id: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.LOW,
            },
            {
                id: 2,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.MEDIUM,
            },
            {
                id: 3,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.HIGH,
            },
            {
                id: 4,
                description: 'description',
            },
        ],
    },
}
