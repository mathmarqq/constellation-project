import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import React, { ReactElement } from 'react'
import styles from './CardLabel.module.scss'

type LabelDetails = {
    description?: string
    className: string
}

type CardLabelProps = {
    label?: CriticityLevel
}

function CardLabel({ label }: CardLabelProps): ReactElement {
    function getLabelDetails(cardLabel?: CriticityLevel): LabelDetails {
        switch (cardLabel) {
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

    const labelDetails = getLabelDetails(label)

    return (
        <span
            className={`${styles.label} ${labelDetails.className}`}
            title={labelDetails.description}
        >
            <span>{labelDetails.description}</span>
        </span>
    )
}

CardLabel.defaultProps = {
    label: '',
}

export default CardLabel
export type { CardLabelProps }
