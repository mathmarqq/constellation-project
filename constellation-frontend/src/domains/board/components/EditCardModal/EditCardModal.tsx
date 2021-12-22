import React, { ReactElement, useState } from 'react'
import Modal from 'components/Modal'
import Card from 'components/Card'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import CardLabel from 'domains/board/components/CardLabel'
import { Card as CardType } from 'domains/board/models/Card'
import styles from './EditCardModal.module.scss'

type EditCardModalProps = {
    card: CardType
    onSave: () => void
    onClose: () => void
    onDelete: () => void
}

function EditCardModal({ card, onSave, onDelete, onClose }: EditCardModalProps): ReactElement {
    const [cardDescription, setCardDescription] = useState(card.description)

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCardDescription(event.target.value)
    }

    const saveCard = () => {
        onSave()
    }

    const deleteCard = () => {
        onDelete()
    }

    return (
        <Modal onClose={onClose} className={styles.modal}>
            <Card className={styles.card}>
                <CardLabel label={card.label} />
                <Textarea
                    placeholder="Enter a description for this card…"
                    value={cardDescription}
                    onChange={handleTextareaChange}
                    className={styles.input}
                />
            </Card>
            <div className={styles.actionButtons}>
                <Button type="button" onClick={saveCard}>
                    Save
                </Button>
                <Button type="button" onClick={deleteCard}>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default EditCardModal
export type { EditCardModalProps }
