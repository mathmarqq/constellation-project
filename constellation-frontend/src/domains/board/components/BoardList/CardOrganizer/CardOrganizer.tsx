import React, { ReactElement, ReactNode } from 'react'
import { List } from 'domains/board/models/List'
import BoardCard from 'domains/board/components/BoardCard'
import Textarea from 'components/Textarea'
import Card from 'components/Card'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import styles from './CardOrganizer.module.scss'

type CardOrganizerProps = {
    list: List
    isCreatingCard: boolean
    newCardDescription: string
    onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function CardOrganizer({
    list,
    isCreatingCard,
    newCardDescription,
    onDescriptionChange,
}: CardOrganizerProps): ReactElement {
    function renderCards(): ReactNode {
        return list.cards.map((card) => (
            <BoardCard key={card.id} card={card} className={styles.card} />
        ))
    }

    return (
        <Droppable droppableId={`${list.id}_list`} type="QUOTE" ignoreContainerClipping={false}>
            {(dropProvided: DroppableProvided) => (
                <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                    {renderCards()}
                    {dropProvided.placeholder}
                    {isCreatingCard ? (
                        <Card className={styles.formCard}>
                            <Textarea
                                placeholder="Enter a description for this card…"
                                value={newCardDescription}
                                onChange={onDescriptionChange}
                            />
                        </Card>
                    ) : null}
                </div>
            )}
        </Droppable>
    )
}

export default CardOrganizer
export type { CardOrganizerProps }
