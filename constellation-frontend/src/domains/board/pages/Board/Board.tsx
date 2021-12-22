import React, { ReactElement, useState } from 'react'
import { Board as BoardType } from 'domains/board/models/Board'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import BoardList from 'domains/board/components/BoardList'
import styles from './Board.module.scss'

const boardFromBackend: BoardType = {
    id: 1,
    title: 'Task Management Board',
    lists: [
        {
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
        {
            id: 2,
            title: 'Title',
            cards: [
                {
                    id: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 2,
                    description: 'description',
                },
            ],
        },
        {
            id: 3,
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
                {
                    id: 5,
                    description: 'description',
                },
                {
                    id: 6,
                    description: 'description',
                },
            ],
        },
        {
            id: 4,
            title: 'Title',
            cards: [
                {
                    id: 1,
                    description: 'This is a Todo list with items that can be marked off',
                    label: CriticityLevel.LOW,
                },
                {
                    id: 2,
                    description: 'description',
                },
            ],
        },
    ],
}

function Board(): ReactElement {
    const [board, setBoard] = useState(boardFromBackend)

    return (
        <div className={styles.board}>
            <div className={styles.header}>
                <h1>{board.title}</h1>
            </div>
            <div className={styles.listWrapper}>
                {board.lists.map((list) => (
                    <BoardList key={list.id} list={list} />
                ))}
            </div>
        </div>
    )
}

export default Board
