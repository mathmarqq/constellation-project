import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import BoardCard, { BoardCardProps } from './BoardCard'

export default {
    title: 'Components/Board/Card',
    component: BoardCard,
    decorators: [
        (StoryComponent) => (
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="1_list" type="QUOTE" ignoreContainerClipping={false}>
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

const Template: Story<BoardCardProps> = (args: BoardCardProps) => <BoardCard {...args} />

export const Main = Template.bind({})
Main.args = {
    card: {
        id: 1,
        index: 1,
        description: 'This is a Todo list with items that can be marked off',
        label: CriticityLevel.LOW,
    },
}
