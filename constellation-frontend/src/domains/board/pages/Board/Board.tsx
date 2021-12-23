import React, { ReactElement, useEffect, useState } from 'react'
import BoardList from 'domains/board/components/BoardList'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { getLists } from 'infra'
import { List } from 'domains/board/models/List'
import styles from './Board.module.scss'

function Board(): ReactElement {
    const [lists, setLists] = useState<List[]>([])

    useEffect(() => {
        getLists().then((fetchedLists: List[]) => {
            setLists(fetchedLists)
        })
    }, [setLists])

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
                            <h1>Task Management Board</h1>
                        </div>
                        <div className={styles.listWrapper}>
                            {lists.map((list) => (
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
