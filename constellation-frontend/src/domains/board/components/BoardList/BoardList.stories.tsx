import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import BoardList, { BoardListProps } from './BoardList'

export default {
    title: 'Components/Board/List',
    component: BoardList,
    decorators: [
        (StoryComponent) => (
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="board" type="LIST" ignoreContainerClipping={false}>
                    {(dropProvided: DroppableProvided) => (
                        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                            <StoryComponent />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        ),
    ],
} as Meta

const Template: Story<BoardListProps> = (args: BoardListProps) => <BoardList {...args} />

export const Main = Template.bind({})
Main.args = {
    list: {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [
            {
                id: 1,
                index: 1,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.LOW,
                listId: 1,
            },
            {
                id: 2,
                index: 2,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.MEDIUM,
                listId: 1,
            },
            {
                id: 3,
                index: 3,
                description: 'This is a Todo list with items that can be marked off',
                label: CriticityLevel.HIGH,
                listId: 1,
            },
            {
                id: 4,
                index: 4,
                description: 'description',
                listId: 1,
            },
        ],
    },
}
