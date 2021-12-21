import Card from 'components/Card'
import PenIcon from 'components/Icons/PenIcon'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { Card as CardType } from 'domains/board/models/Card'
import React, { ReactElement } from 'react'
import styles from './BoardCard.module.scss'

type LabelDetails = {
    description?: string
    className: string
}

type BoardCardProps = {
    card: CardType
    className?: string
}

function BoardCard({ card, className }: BoardCardProps): ReactElement {
    function getLabelDetails(label?: CriticityLevel): LabelDetails {
        switch (label) {
            case CriticityLevel.LOW:
                return {
                    description: 'Low Criticity',
                    className: styles.lowCriticity,
                }
            case CriticityLevel.MEDIUM:
                return {
                    description: 'Medium Criticity',
                    className: styles.mediumCriticity,
                }
            case CriticityLevel.HIGH:
                return {
                    description: 'High Criticity',
                    className: styles.highCriticity,
                }
            default:
                return {
                    className: styles.noneLabel,
                }
        }
    }

    const labelDetails = getLabelDetails(card.label)

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
            <span
                className={`${styles.label} ${labelDetails.className}`}
                title={labelDetails.description}
            >
                <span>{labelDetails.description}</span>
            </span>
            <span className={styles.description}>{card.description}</span>
        </Card>
    )
}

BoardCard.defaultProps = {
    className: '',
}

export default BoardCard
export type { BoardCardProps }
