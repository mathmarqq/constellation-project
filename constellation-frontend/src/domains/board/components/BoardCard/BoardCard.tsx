import Card from 'components/Card'
import PenIcon from 'components/Icons/PenIcon'
import { Card as CardType } from 'domains/board/models/Card'
import React, { CSSProperties, ReactElement, useRef, useState } from 'react'
import CardLabel from 'domains/board/components/CardLabel'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import styles from './BoardCard.module.scss'
import EditCardModal from '../EditCardModal'

type BoardCardProps = {
    card: CardType
    className?: string
}

function BoardCard({ card, className }: BoardCardProps): ReactElement {
    const [isShowingModal, setIsShowingModal] = useState(false)
    const [modalStyle, setModalStyle] = useState<CSSProperties | undefined>(undefined)
    const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)

    const setRef = (dragProvided: DraggableProvided, ref: HTMLDivElement | null): void => {
        dragProvided.innerRef(ref)
        setCardRef(ref)
    }

    const onEdit = (): void => {
        if (cardRef) {
            setModalStyle({
                top: cardRef.offsetTop,
                left: cardRef.offsetLeft,
                width: cardRef.clientWidth,
                height: cardRef.clientHeight * 1.3,
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
            <Draggable draggableId={`${card.id}`} index={card.index}>
                {(dragProvided: DraggableProvided) => (
                    <Card
                        className={`${styles.card} ${className}`}
                        ref={(ref) => setRef(dragProvided, ref)}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                    >
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
                )}
            </Draggable>
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
