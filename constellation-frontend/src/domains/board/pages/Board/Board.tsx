import React, { ReactElement, useEffect, useState } from 'react'
import BoardList from 'domains/board/components/BoardList'
import {
    DragDropContext,
    DraggableLocation,
    Droppable,
    DroppableProvided,
    DropResult,
} from 'react-beautiful-dnd'
import { editCard, editList, getLists } from 'infra'
import { List } from 'domains/board/models/List'
import styles from './Board.module.scss'

function Board(): ReactElement {
    const [lists, setLists] = useState<List[]>([])

    useEffect(() => {
        getLists().then((fetchedLists: List[]) => {
            setLists(fetchedLists)
        })
    }, [setLists])

    function changeListIndex(source: DraggableLocation, destination: DraggableLocation) {
        const sourceIndex = source.index
        const destinationIndex = destination.index

        const sourceList = lists.filter((list) => list.index === sourceIndex)[0]
        const destinationList = lists.filter((list) => list.index === destinationIndex)[0]

        Promise.all([
            editList(sourceList.id, { title: sourceList.title, index: destinationIndex }),
            editList(destinationList.id, { title: destinationList.title, index: sourceIndex }),
        ]).then(() => {})
    }

    function changeCardIndex(source: DraggableLocation, destination: DraggableLocation) {
        const sourceListId = parseInt(source.droppableId.split('_')[0], 10)
        const sourceList = lists.filter((list) => list.id === sourceListId)[0]
        const sourceCard = sourceList.cards.filter((card) => card.index === source.index)[0]

        editCard(sourceCard.id, {
            index: destination.index,
            description: sourceCard.description,
            label: sourceCard.label,
            listId: sourceCard.listId,
        }).then(() => {})
    }

    const onDragEnd = (result: DropResult) => {
        const { type, destination, source } = result

        if (destination) {
            if (type === 'COLUMN') {
                changeListIndex(source, destination)
            } else {
                changeCardIndex(source, destination)
            }
        }
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
                            <h1>Task Management Board</h1>
                        </div>
                        <div className={styles.listWrapper}>
                            {lists
                                .sort((a, b) => a.index - b.index)
                                .map((list) => (
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
