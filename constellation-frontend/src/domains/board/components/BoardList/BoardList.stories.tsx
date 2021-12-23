import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import withMock from 'storybook-addon-mock'
import BoardList, { BoardListProps } from './BoardList'

export default {
    title: 'Components/Board/List',
    component: BoardList,
    decorators: [
        withMock,
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
    parameters: {
        mockData: [
            {
                url: 'http://localhost:3000/cards/1',
                method: 'PUT',
                status: 200,
            },
            {
                url: 'http://localhost:3000/cards',
                method: 'POST',
                status: 200,
            },
            {
                url: 'http://localhost:3000/cards/1',
                method: 'DELETE',
                status: 200,
            },
            {
                url: 'http://localhost:3000/lists/1',
                method: 'PUT',
                status: 200,
            },
            {
                url: 'http://localhost:3000/lists/1',
                method: 'DELETE',
                status: 200,
            },
        ],
    },
} as Meta

const Template: Story<BoardListProps> = (args: BoardListProps) => <BoardList {...args} />

const buildCards = (numberOfCards: number) => {
    const cards = []

    for (let i = 0; i < numberOfCards; i += 1) {
        cards.push({
            id: i,
            index: i,
            description: 'This is a Todo list with items that can be marked off',
            label: CriticityLevel.LOW,
            listId: 1,
        })
    }

    return cards
}

export const WithoutCards = Template.bind({})
WithoutCards.args = {
    list: {
        id: 1,
        index: 1,
        title: 'Title',
        cards: [],
    },
}

export const WithManyCards = Template.bind({})
WithManyCards.args = {
    list: {
        id: 1,
        index: 1,
        title: 'Title',
        cards: buildCards(5),
    },
}

export const WithScroll = Template.bind({})
WithScroll.args = {
    list: {
        id: 1,
        index: 1,
        title: 'Title',
        cards: buildCards(30),
    },
}
