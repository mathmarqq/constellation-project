import React, { ReactElement, useState } from 'react'
import { Board as BoardType } from 'domains/board/models/Board'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import BoardList from 'domains/board/components/BoardList'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import styles from './Board.module.scss'

const boardFromBackend: BoardType = {
    id: 1,
    title: 'Task Management Board',
    lists: [
        {
            id: 1,
            index: 1,
            title: 'Title',
            cards: [
                {
                    id: 1,
                    index: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 2,
                    index: 2,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.MEDIUM,
                },
                {
                    id: 3,
                    index: 3,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.HIGH,
                },
                {
                    id: 4,
                    index: 4,
                    description: 'description',
                },
            ],
        },
        {
            id: 2,
            index: 2,
            title: 'Title',
            cards: [
                {
                    id: 5,
                    index: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 6,
                    index: 2,
                    description: 'description',
                },
            ],
        },
        {
            id: 3,
            index: 3,
            title: 'Title',
            cards: [
                {
                    id: 7,
                    index: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 8,
                    index: 2,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.MEDIUM,
                },
                {
                    id: 9,
                    index: 3,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.HIGH,
                },
                {
                    id: 10,
                    index: 4,
                    description: 'description',
                },
                {
                    id: 11,
                    index: 5,
                    description: 'description',
                },
                {
                    id: 12,
                    index: 6,
                    description: 'description',
                },
            ],
        },
        {
            id: 4,
            index: 4,
            title: 'Title',
            cards: [
                {
                    id: 13,
                    index: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 14,
                    index: 2,
                    description: 'description',
                },
            ],
        },
    ],
}

function Board(): ReactElement {
    const [board] = useState(boardFromBackend)

    const onDragEnd = () => {
        // const { type, destination, source, draggableId } = result
        // if (destination) {
        //     if (result.type === 'COLUMN') {
        //         const [destinationListId] = destination.droppableId.split('_')
        //         const [sourceListId] = source.droppableId.split('_')
        //     } else {
        //         const [sourceListId] = source.droppableId.split('_')
        //         const [destinationListId] = destination.droppableId.split('_')
        //         const sourceList = board.lists.filter((list) => ( list.id === parseInt(sourceListId, 10) ))
        //         sourceList[0].cards.filter((card) => ( card.id === parseInt(draggableId, 10) ))
        //     }
        // }
        // console.log(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={false}
            >
                {(provided: DroppableProvided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.board}
                    >
                        <div className={styles.header}>
                            <h1>{board.title}</h1>
                        </div>
                        <div className={styles.listWrapper}>
                            {board.lists.map((list) => (
                                <BoardList key={list.id} list={list} />
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board
