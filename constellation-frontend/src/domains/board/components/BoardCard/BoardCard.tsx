import Card from 'components/Card'
import PenIcon from 'components/Icons/PenIcon'
import { Card as CardType } from 'domains/board/models/Card'
import React, { ReactElement } from 'react'
import CardLabel from 'domains/board/components/CardLabel'
import styles from './BoardCard.module.scss'

type BoardCardProps = {
    card: CardType
    className?: string
}

function BoardCard({ card, className }: BoardCardProps): ReactElement {
    return (
        <Card className={`${styles.card} ${className}`}>
            <button
                className={`${styles.hoveredElement} ${styles.editButton}`}
                type="button"
                title="Edit Card"
                aria-label="Edit Card"
            >
                <span className={styles.hideInformation}>Edit</span>
                <PenIcon className={`${styles.editIcon}`} aria-hidden="true" />
            </button>
            <CardLabel label={card.label} />
            <span className={styles.description}>{card.description}</span>
        </Card>
    )
}

BoardCard.defaultProps = {
    className: '',
}

export default BoardCard
export type { BoardCardProps }
