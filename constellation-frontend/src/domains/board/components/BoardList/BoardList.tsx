import React, { ReactElement, ReactNode, useState } from 'react'
import { List } from 'domains/board/models/List'
import BoardCard from 'domains/board/components/BoardCard'
import Textarea from 'components/Textarea'
import Card from 'components/Card'
import Button from 'components/Button'
import styles from './BoardList.module.scss'
import CloseIcon from '../../../../components/Icons/CloseIcon/CloseIcon'

type BoardListProps = {
    list: List
}

function BoardList({ list }: BoardListProps): ReactElement {
    const [isCreatingCard, setIsCreatingCard] = useState(false)
    const [cardDescription, setCardDescription] = useState('')

    const handleTextareChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className={styles.list}>
            <div className={styles.header}>
                <h2>{list.title}</h2>
            </div>
            <div>
                {renderCards()}
                {isCreatingCard ? (
                    <Card className={styles.formCard}>
                        <Textarea
                            placeholder="Enter a description for this card…"
                            value={cardDescription}
                            onChange={handleTextareChange}
                        />
                    </Card>
                ) : null}
            </div>
            <div className={styles.footer}>
                {isCreatingCard ? (
                    <>
                        <Button type="button" onClick={saveCard} className={styles.saveButton}>
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
                            <CloseIcon className={`${styles.closeIcon}`} aria-hidden="true" />
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
    )
}

export default BoardList
export type { BoardListProps }
