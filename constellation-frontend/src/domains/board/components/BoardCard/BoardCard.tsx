import Card from 'components/Card'
import PenIcon from 'components/Icons/PenIcon'
import { Card as CardType } from 'domains/board/models/Card'
import React, { CSSProperties, ReactElement, useRef, useState } from 'react'
import CardLabel from 'domains/board/components/CardLabel'
import styles from './BoardCard.module.scss'
import EditCardModal from '../EditCardModal'

type BoardCardProps = {
    card: CardType
    className?: string
}

function BoardCard({ card, className }: BoardCardProps): ReactElement {
    const [isShowingModal, setIsShowingModal] = useState(false)
    const [modalStyle, setModalStyle] = useState<CSSProperties | undefined>(undefined)
    const cardRef = useRef<HTMLDivElement | null>(null)

    const onEdit = (): void => {
        if (cardRef.current) {
            setModalStyle({
                top: cardRef.current.offsetTop,
                left: cardRef.current.offsetLeft,
                width: cardRef.current.clientWidth,
                height: cardRef.current.clientHeight * 1.3,
            })
            setIsShowingModal(true)
        }
    }

    const closeModal = () => {
        setModalStyle({})
        setIsShowingModal(false)
    }

    return (
        <>
            <Card className={`${styles.card} ${className}`} ref={cardRef}>
                <button
                    className={`${styles.hoveredElement} ${styles.editButton}`}
                    type="button"
                    title="Edit Card"
                    aria-label="Edit Card"
                    onClick={onEdit}
                >
                    <span className={styles.hideInformation}>Edit Card</span>
                    <PenIcon className={`${styles.editIcon}`} aria-hidden="true" />
                </button>
                <CardLabel label={card.label} />
                <span className={styles.description}>{card.description}</span>
            </Card>
            {isShowingModal && modalStyle ? (
                <EditCardModal
                    card={card}
                    style={modalStyle}
                    onSave={closeModal}
                    onDelete={closeModal}
                    onClose={closeModal}
                />
            ) : null}
        </>
    )
}

BoardCard.defaultProps = {
    className: '',
}

export default BoardCard
export type { BoardCardProps }
