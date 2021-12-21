import React, { ReactElement, ReactNode } from 'react'
import { List } from 'domains/board/models/List'
import BoardCard from 'domains/board/components/BoardCard'
import styles from './BoardList.module.scss'

type BoardListProps = {
    list: List
}

function BoardList({ list }: BoardListProps): ReactElement {
    function renderCards(): ReactNode {
        return list.cards.map((card) => (
            <BoardCard key={card.id} card={card} className={styles.card} />
        ))
    }

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <span>{list.title}</span>
            </div>
            <div>{renderCards()}</div>
            <div className={styles.footer}>
                <span>Add a card</span>
            </div>
        </div>
    )
}

export default BoardList
export type { BoardListProps }
