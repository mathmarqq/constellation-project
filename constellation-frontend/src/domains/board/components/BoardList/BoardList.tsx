import React, { ReactElement, ReactNode, useState } from 'react'
import { List } from 'domains/board/models/List'
import BoardCard from 'domains/board/components/BoardCard'
import Textarea from 'components/Textarea'
import Card from 'components/Card'
import Button from 'components/Button'
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import styles from './BoardList.module.scss'
import CloseIcon from '../../../../components/Icons/CloseIcon/CloseIcon'

type BoardListProps = {
    list: List
}

function BoardList({ list }: BoardListProps): ReactElement {
    const [isCreatingCard, setIsCreatingCard] = useState(false)
    const [cardDescription, setCardDescription] = useState('')

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardDescription(event.target.value)
    }

    const saveCard = (): void => {
        setIsCreatingCard(false)
    }

    const cancelForm = () => {
        setCardDescription('')
        setIsCreatingCard(false)
    }

    function renderCards(): ReactNode {
        return list.cards.map((card) => (
            <BoardCard key={card.id} card={card} className={styles.card} />
        ))
    }

    return (
        <Draggable draggableId={`${list.id}_list`} index={list.index}>
            {(provided: DraggableProvided) => (
                <div ref={provided.innerRef} className={styles.list} {...provided.draggableProps}>
                    <div className={styles.header}>
                        <h2 {...provided.dragHandleProps}>{list.title}</h2>
                    </div>
                    <Droppable
                        droppableId={`${list.id}_list`}
                        type="QUOTE"
                        ignoreContainerClipping={false}
                    >
                        {(dropProvided: DroppableProvided) => (
                            <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                                {renderCards()}
                                {dropProvided.placeholder}
                                {isCreatingCard ? (
                                    <Card className={styles.formCard}>
                                        <Textarea
                                            placeholder="Enter a description for this card…"
                                            value={cardDescription}
                                            onChange={handleTextareaChange}
                                        />
                                    </Card>
                                ) : null}
                            </div>
                        )}
                    </Droppable>
                    <div className={styles.footer}>
                        {isCreatingCard ? (
                            <>
                                <Button
                                    type="button"
                                    onClick={saveCard}
                                    className={styles.saveButton}
                                >
                                    Save card
                                </Button>
                                <button
                                    className={styles.closeButton}
                                    type="button"
                                    title="Cancel Form"
                                    aria-label="Cancel Form"
                                    onClick={cancelForm}
                                >
                                    <span className={styles.hideInformation}>Cancel Form</span>
                                    <CloseIcon
                                        className={`${styles.closeIcon}`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </>
                        ) : (
                            <button
                                className={styles.addButton}
                                type="button"
                                onClick={() => setIsCreatingCard(true)}
                            >
                                Add a card
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default BoardList
export type { BoardListProps }
